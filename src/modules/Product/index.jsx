import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Col, Row } from 'reactstrap';

import './style.scss';

const Product = (props) => {
  const {
    description = '',
    image_url: image = '',
    name = '',
    ph = 0,
    tagline = '',
  } = props;

  return (
    <div className="Product">
      <Row className="align-items-center">
        <Col sm="12" md="4">
          <img src={image} className="Product--image" alt={name} />
        </Col>
        <Col sm="12" md="8">
          <h3>{name}</h3>
          <div><i>{tagline}</i></div>
          <Badge color="primary">{ph}</Badge>
          <p>{description}</p>
        </Col>
      </Row>
    </div>
  );
};

Product.propTypes = {
  description: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ph: PropTypes.number.isRequired,
  tagline: PropTypes.string.isRequired,
};

export default Product;
