import React from 'react';
import {
  Col,
  Container,
  Navbar,
  NavbarBrand,
  Row,
} from 'reactstrap';

const Navigation = () => (
  <div>
    <Navbar color="primary" dark>
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <NavbarBrand href="/">My favorite beers</NavbarBrand>
          </Col>
        </Row>
      </Container>
    </Navbar>
  </div>
);

export default Navigation;
