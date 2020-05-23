/* Third Party */
import React from 'react';
import {
  Row, Col, Badge, Button, CardBody, Collapse, Spinner, Modal,
  ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
} from 'reactstrap';

/* Components */
import {
  DashbaordItem, OuterContainer, InnerContainer, Heading, LoadingModal,
  CardImage, ImageContainer, Text, Title, Links, Notifications, Notification,
  ModalStyled,
} from './style';
import {Trash2} from 'react-feather';

import image from '../Images/1.jpg';
import image2 from '../Images/2.jpg';
import image3 from '../Images/3.jpg';
import image4 from '../Images/4.jpg';
import image5 from '../Images/5.jpg';

/* Functions */

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsOpen: false,
      description: '',
      name: '',
      groups: [],
      deleteModal: false,
      groupid: '',
      loadingModal: false,
    };
  }

  toggleNotifications = () => {
    this.setState({notificationsOpen: !this.state.notificationsOpen});
  }

  componentDidMount() {
    this.fetchGroup();
  }

  createGroup = () => {
    this.toggleLoad();
    fetch('/api/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
      }),
    }).then((res, err) => {
      if (err) {
        console.log(err);
      } else {
        res.json().then((json) => console.log(json));
      }
      this.fetchGroup();
    });
    this.closeModal();
  }

  fetchGroup = () => {
    this.setState({
      loadingModal: true,
    });
    fetch('/api/groups').then((res, err) => {
      if (err) {
        console.log(err);
      } else {
        res.json().then((json) => this.setState({
          groups: json,
        }));
      }
    });
    this.setState({
      loadingModal: false,
    });
  }

  toggleDelete = (id) => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      groupid: id,
    });
  }

  toggleLoad = () => {
    this.setState({
      loadingModal: !this.state.loadingModal,
    });
  }

  deleteGroup = () => {
    console.log(this.state.groupid);
    fetch('/api/groups/'+this.state.groupid, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res, err) => {
      if (err) {
        console.log(err);
      }
      this.fetchGroup();
    });
    this.toggleDelete('');
  }

  changeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  toggleCreate = () =>{
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      description: '',
      name: '',
    });
  }

  closeModal = () =>{
    this.setState({
      isModalOpen: false,
      description: '',
      name: '',
    });
  }

  render() {
    const calendars = [];
    const arrayImages = [image, image2, image3, image4, image5];

    this.state.groups.forEach((group, index) => {
      console.log(group);
      const groupurl = '/calendar/'+group._id;
      calendars.push(
          <Col className="col-4">
            <Links to={groupurl}>
              <DashbaordItem>
                <ImageContainer>
                  <CardImage src={arrayImages[index%5]} alt="Background image" />
                </ImageContainer>
                <CardBody>
                  <Title>
                    {group.name}
                    <Button onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      this.toggleDelete(group._id);
                    }} color="clear">
                      <Trash2/>
                    </Button>
                  </Title>
                  <hr />
                  <Text>{group.description}</Text>
                </CardBody>
              </DashbaordItem>
            </Links>
          </Col>,
      );
    });

    const notifications = [];
    const items = [
      'Proident id occaecat incididunt in ullamco duis consectetur excepteur aliquip.',
      'Proident ipsum exercitation commodo ea id occaecat quis sit Lorem est sit ea.',
      'Sint id sit amet et id ut excepteur ex nisi et non anim.',
      'In ea ipsum amet aliquip deserunt cillum nostrud adipisicing et ipsum commodo est ullamco.',
    ];

    items.forEach((item, index) => {
      notifications.push(
          <Notification key={index} color='primary'>
            {item}
          </Notification>,
      );
    });

    return (
      <OuterContainer>

        <ModalStyled size="lg" isOpen={this.state.isModalOpen} toggle={this.toggleCreate}>
          <ModalHeader toggle={this.toggleCreate}>Create New Group</ModalHeader>
          <ModalBody>
            <Row>
              <Col className="col-12">
                <FormGroup>
                  <Label>Name of Group Calendar</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name of group"
                    onChange={this.changeInput}
                    value={this.state.name}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label >Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    onChange={this.changeInput}
                    value={this.state.description}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.createGroup}>Add</Button>
            <Button color="secondary" onClick={this.toggleCreate}>Cancel</Button>
          </ModalFooter>
        </ModalStyled>

        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDelete} >
          <ModalHeader toggle={this.toggleDelete}>Delete Group</ModalHeader>
          <ModalBody>
            Are you sure you want to remove test? You&apos;ll no longer have access to this calendar and its events.
            Other people with access to the calendar can continue to use it
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.deleteGroup}>Delete Group</Button>
            <Button color="secondary" onClick={this.toggleDelete}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <LoadingModal isOpen={this.state.loadingModal} toggle={this.toggleLoad} >
          <Spinner color="primary" style={{height: '250px', width: '250px'}}/>
        </LoadingModal>

        <InnerContainer>
          <Row>
            <Col>
              <Heading>
                Dashboard
                <Button color="primary" outline onClick={this.toggleNotifications}>
                  Notifications <Badge color="secondary">4</Badge>
                </Button>
                <Collapse isOpen={this.state.notificationsOpen}>
                  <Notifications>
                    {notifications}
                  </Notifications>
                </Collapse>
              </Heading>
            </Col>
          </Row>
          <Row>
            {calendars}
            <Col className="col-4">
              <DashbaordItem>
                <Button color="primary" outline onClick={this.toggleCreate} style={{flex: 1, borderRadius: 10}}>
                  Create Group
                </Button>
              </DashbaordItem>
            </Col>
          </Row>
        </InnerContainer>
      </OuterContainer>
    );
  }
}

export default LandingPage;
