import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Col, Row } from 'reactstrap';

import { truncateText } from '../../utils';
import './style.scss';

const Product = (props) => {
  const {
    description = '',
    descriptionLimit = 40,
    image_url: image = '',
    first_brewed: firstBreved = '',
    name = '',
    ph = 0,
    tagline = '',
  } = props;

  return (
    <div className="Product">
      <Row className="align-items-center">
        <Col sm="12" lg="4">
          <img src={image} className="Product--image" alt={name} />
        </Col>
        <Col sm="12" lg="8">
          <h3>{name}</h3>
          <div><i>{tagline}</i></div>
          <p>
            First brewed:
            <strong className="pl-2">{firstBreved}</strong>
          </p>
          <p>
            pH:
            <Badge color="primary" className="ml-2">{ph}</Badge>
          </p>
          <p>{truncateText(description, descriptionLimit)}</p>
        </Col>
      </Row>
    </div>
  );
};

Product.propTypes = {
  description: PropTypes.string,
  descriptionLimit: PropTypes.number,
  first_brewed: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ph: PropTypes.number,
  tagline: PropTypes.string,
};

Product.defaultProps = {
  description: '',
  descriptionLimit: 40,
  ph: 0,
  tagline: '',
};

export default Product;
