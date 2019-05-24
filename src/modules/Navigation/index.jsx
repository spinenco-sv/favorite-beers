import React from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
} from 'reactstrap';

const Navigation = () => (
  <div>
    <Navbar color="primary" dark>
      <Container>
        <NavbarBrand href="/" className="mx-auto">
          <h3>My favorite beers</h3>
        </NavbarBrand>
      </Container>
    </Navbar>
  </div>
);

export default Navigation;
