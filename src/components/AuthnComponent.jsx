import React from 'react';
import { MDBBtn, MDBIcon, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const AuthnComponent = () => {
    const navigate = useNavigate();
    const username = JSON.parse(localStorage.getItem("userData"))?.username;

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/login");
        window.location.reload();
    };

    return (
        <MDBNavbarNav>
            <MDBNavbarItem>
                <MDBNavbarLink className="text-white">{username}</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <MDBBtn onClick={handleLogOut} color='link' rippleColor='dark'>
                    <MDBIcon fas icon="sign-out-alt" />
                </MDBBtn>
            </MDBNavbarItem>
        </MDBNavbarNav>
    );
};

export default AuthnComponent;
