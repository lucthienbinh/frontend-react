import React from 'react';
import './index.css';

import Container from 'react-bootstrap/Container'
import NavBar from '../../../Components/Navbar'
import Footer from '../../../Components/Navbar'

import AdminLinks from '../../../Components/Navbar/Links/AdminLinks'


export default function AdminLayout({children}) {
    return (
        <>
            <NavBar links={AdminLinks} loggedIn/>
            <hr />
            <Container>
                {children}
            </Container>
            <hr />
            <Footer/>
        </>
    )
}