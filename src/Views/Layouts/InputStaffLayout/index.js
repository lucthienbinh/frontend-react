import React from 'react';
import './index.css';

import Container from 'react-bootstrap/Container'
import NavBar from '../../../Components/Navbar'
import Footer from '../../../Components/Navbar'

import InputStaffLinks from '../../../Components/Navbar/Links/InputStaffLinks'


export default function InputStaffLayout({children}) {
    return (
        <>
            <NavBar links={InputStaffLinks} loggedIn/>
            <hr />
            <Container>
                {children}
            </Container>
            <hr />
            <Footer/>
        </>
    )
}