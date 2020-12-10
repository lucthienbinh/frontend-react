import React from 'react';
import './index.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {
    Link
} from "react-router-dom";

// Source code: https://www.w3schools.com/howto/howto_css_fixed_footer.asp

export default function Footer() {
    return (
        <footer className="font-small blue py-2 bg-secondary">
            <Container className="Footer-container text-center " fluid>
                <Row>
                    <Col className="md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase">Footer Content</h5>
                        <p>CHPLAY and APPSTORE LINK, etc..</p>
                    </Col>
                    <hr className="clearfix w-100 d-md-none pb-3" />
                    <Col className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Liên hệ</h5>
                        <address>
                            Thiết kế bởi <a href="hieu.abc">Hieu Phan</a>.<br/>
                        </address>
                    </Col>
                    <Col className="md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#!">Về chúng tôi</a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <div className="footer-copyright text-center py-2">	&copy; 2019 Copyright:
                    <Link> Hieu Phan</Link>
            </div>
        </footer>
    )
}