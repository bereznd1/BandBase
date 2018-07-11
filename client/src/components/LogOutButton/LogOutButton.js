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
            window.location.reload();
        })
        .catch(err => console.log(err));

    };

    render() {
        return (
            <div>
                <a href = "#" onClick={this.handleLogout}>Logout</a>
            </div>
        )
    }
    

};

export default LogOutButton; 