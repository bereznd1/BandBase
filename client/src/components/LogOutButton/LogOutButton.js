import React from "react";
import { Modal, Button, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import LogForm from "../../components/LogForm";
import API from "../../utils/API";

class LogOutButton extends React.Component{
    handleLogout = event => {
        event.preventDefault();
        API.userLogout()
        .then(res => {
            if(res.status === 200){
                console.log(res.data.msg);
            }
        })
        .catch(err => console.log(err));

    };

    render() {
        return (
            <div>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
    

};

export default LogOutButton; 