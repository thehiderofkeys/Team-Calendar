import {SET_DATES, SET_TIMES, SET_TITLE, RESET_EVENT_MODAL, SET_ID} from '../action-types';
import moment from 'moment';

export default function eventModal(state = {startDate: '', startTime: '', endDate: '', endTime: '', title: '', id: ''}
    , action) {
  switch (action.type) {
    case SET_DATES: {
      return Object.assign({}, state, {
        startDate: action.startDate,
        endDate: action.endDate,
      });
    }
    case SET_TIMES: {
      return Object.assign({}, state, {
        startTime: action.startTime,
        endTime: action.endTime,
      });
    }
    case SET_TITLE: {
      return Object.assign({}, state, {
        title: action.title,
      });
    }
    case SET_ID: {
      return Object.assign({}, state, {
        id: action.id,
      });
    }
    case RESET_EVENT_MODAL: {
      return {
        startDate: moment().format('YYYY-MM-DD'),
        startTime: moment().format('HH:mm'),
        endDate: moment().format('YYYY-MM-DD'),
        endTime: moment().add(1, 'hours').format('HH:mm'),
      };
    }
    default:
      return state;
  }
}
