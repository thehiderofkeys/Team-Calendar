import styled from 'styled-components';
import {Card, Modal} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Trash2} from 'react-feather';


export const DashboardItem = styled(Card)`
  display: flex;
  justify-content: center;
  height:380px;
  box-shadow: 2px 2px 10px grey;
  margin:20px 0 20px 0;
  border-radius: 10px;
  text-decoration: none;
`;

export const OuterContainer = styled.div`
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  width:100%;
`;

export const InnerContainer = styled.div`
  display:flex;
  flex-direction: column;
  justify-content:center;
  width:80%;
`;

export const Heading = styled.div`
  flex-direction: column;
  font-size: 35px;
  font-weight: 500;
  margin: 20px 0 0 0;
`;

export const CardImage = styled.img`
  object-fit: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 1;
  transition: all 1.0s ease;
  background-color: #3c4858;
  height:100%;
  width:100%;
  &:hover{
    transform: rotate(10deg) scale(1.5);
    opacity: 0.5;
  }
  z-index: 1;
`;

export const ImageContainer = styled.div`
  width:100%;
  height:200px;
  position: relative;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const Title = styled.p`
  text-decoration:none;
  font-size:25px;
  font-weight: 500;
  align-content: left;
  align-items: center;
  display:flex;
  justify-content: space-between;
  width: 100%;
`;

export const Text = styled.p`
  font-size:15px;
`;

export const DeleteButton = styled(Trash2)`
  align-content: right;
  display: flex;
  pointer-events: none;
`;


export const Links = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus, &:visited, &:link, &:active {
      text-decoration: none;
  }

  &:hover{
      text-decoration: none;
      color: #007bff;
  }
`;

export const ModalStyled = styled(Modal)`
  max-width:1000px;
  margin-top: 10%;
`;

export const LoadingModal = styled(Modal)`
  height: 90%;
  width: 250px;
  display:flex;
  justify-content:center;
  align-items:center;
  .modal-content{
    background-color: rgba(0,0,0,.0001);
    border-color: rgba(0,0,0,.0001);
  }
`;

