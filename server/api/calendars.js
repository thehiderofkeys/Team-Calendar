const {google} = require('googleapis')
import fs from 'fs'
import { User, Group } from '../db/schema';
import {oAuth2Client} from './login';
export default router => {
    router.get("/calendars", (req, res) => {
        ensureLogin(req,res, async () =>{
            const user = await User.findOne({'googleId': req.session.user.id});
            oAuth2Client.setCredentials(user.token);
            var calendar = google.calendar({version:'v3', auth:oAuth2Client});
            calendar.calendarList.list((err,result)=>{
                const calendarItems = result.data.items.map( (item) => ({
                    id:item.id,
                    name:item.summary,
                }));
                res.json({calendars:calendarItems});
            })
        });
    })
    router.get("/calendars/:_id/events", (req, res) => {
        ensureLogin(req,res, async () =>{
            isMember(req,res, async () =>{
                const group = await Group.findOne({ "_id": req.params._id});
                const resultsArray = [];
                await Promise.all(group.calendars.map(async (item) => {
                    const user = await User.findOne({'googleId': item.googleId});
                    oAuth2Client.setCredentials(user.token);
                    const calendar = google.calendar({version: 'v3', auth:oAuth2Client});
                    const results = await Promise.all(
                        item.calendarIds.map(async (calendarId) => getCalendarEvents(calendar, calendarId))
                    );
                    const events = [].concat.apply([],results); // Join the arrays of arrays into a single array
                    resultsArray.push({
                        googleId: item.googleId,
                        events: events,
                    })
                }));
                res.json({result:resultsArray});
            });
        });
    })
    router.post("/calendars/:_id", (req, res) => {
        ensureLogin(req,res, async () =>{
            isMember(req,res, async () =>{
                const group = await Group.findOne({ "_id": req.params._id});
                const otherCalendars = group.calendars.filter(entry => entry.googleId!==req.session.user.id );
                const userCalendars = {googleId:req.session.user.id,calendarIds:req.body.calendars};
                otherCalendars.push(userCalendars);
                group.calendars = otherCalendars;
                group.save();
                res.status(204).send();
            });
        });
    })
    router.get("/calendars/:_id", (req, res) => {
        ensureLogin(req,res, async () =>{
            isMember(req,res, async () =>{
                const group = await Group.findOne({ "_id": req.params._id});
                const userCalendars = group.calendars.find(entry => entry.googleId===req.session.user.id );
                const userCalendarIds = userCalendars?userCalendars.calendarIds:[];
                res.json({calendars:userCalendarIds});
            });
        });
    })
}
async function ensureLogin(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        return res.sendStatus(401);
    }
}

async function isMember(req, res, next) {
    const isMember = await Group.find({ "_id": req.params._id, "members": req.session.user.id });
    if (isMember) {
        next();
    } else {
        return res.sendStatus(401);
    }
}

async function getCalendarEvents(calendar, calendarId) {
    return new Promise( (resolve, reject) =>{
        calendar.events.list({
            calendarId: calendarId,
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        }, (err, result) => {
            const r  = result.data.items.map((event) => ({
                summary:event.summary,
                startDate: event.start.dateTime || event.start.date,
                endDate: event.end.dateTime || event.end.date
            }))
            resolve (r);
        })
    })
}