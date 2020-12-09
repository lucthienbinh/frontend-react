import React from 'react';
import './index.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {
    Link
} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="page-footer font-small blue p-5 bg-dark">
            {/* Footer Links */}
            <Container className="text-center text-md-left" fluid>
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
                            Địa chỉ: ĐH CNTN -<br/> 
                            Linh Trung - Thủ Đức - Hcm<br/>
                            Email: <a href="mailto:mhieu25101998@gmail.com">mhieu25101998@gmail.com</a>
                        </address>
                    </Col>
                    <Col className="md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#!">Về chúng tôi</a>
                            </li>
                            <li>
                                <a href="#!">Điều khoản & Điều lệ</a>
                            </li>
                            <li>
                                <a href="#!">Câu hỏi thường gặp</a>
                            </li>
                            <li>
                                <a href="#!">Trợ giúp</a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <div className="footer-copyright text-center py-3">	&copy; 2019 Copyright:
                    <Link> Hieu Phan</Link>
            </div>
        </footer>
    )
}