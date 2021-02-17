import React from 'react';
import './index.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Source code: https://www.w3schools.com/howto/howto_css_fixed_footer.asp

export default function Footer() {
    return (
        <footer className="font-small py-2">
            <Container className="Footer-container text-center " fluid>
                <Row>
                    <Col className="md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase">Project Information</h5>
                        <p>Graduation Thesis 2021 - Software Engineering</p>
                        <p>University Of Information Technology - VNU</p>
                    </Col>
                    <hr className="clearfix w-100 d-md-none pb-3" />
                    <Col className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Student</h5>
                        <p>(Leader) Luc Thien Binh - 16520092</p>
                        <p>Bui Gia Hoa - 16520442</p>
                    </Col>
                    <Col className="md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Lecturer</h5>
                        <p>Master Nguyen Cong Hoan</p>
                        <p>Master Vu Duc Lung</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}