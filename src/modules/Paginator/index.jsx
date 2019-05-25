import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  PaginationLink,
  Pagination,
  PaginationItem,
  Row,
} from 'reactstrap';

const Paginator = (props) => {
  const {
    itemsLength,
    itemsPerPage,
    onPageChange,
  } = props;

  const [currentPage, setPage] = useState(1);

  useEffect(() => {
    const indexOfLastBeer = currentPage * itemsPerPage;
    const indexOfFirstBeer = indexOfLastBeer - itemsPerPage;
    onPageChange(indexOfFirstBeer, indexOfLastBeer);
  }, [
    currentPage,
    itemsLength,
  ]);

  useEffect(() => {
    setPage(1);
  }, [itemsLength]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(itemsLength / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return itemsLength > 0 ? (
    <Row className="justify-content-center mt-5">
      <Col className="d-flex">
        <Pagination size="lg" className="mx-auto">
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink first onClick={() => setPage(currentPage - 1)} />
          </PaginationItem>
          {pageNumbers.map(page => (
            <PaginationItem active={page === currentPage} key={`page-${page}`}>
              <PaginationLink onClick={() => setPage(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={currentPage === pageNumbers.length}>
            <PaginationLink last onClick={() => setPage(currentPage + 1)} />
          </PaginationItem>
        </Pagination>
      </Col>
    </Row>
  ) : null;
};

Paginator.propTypes = {
  itemsLength: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

Paginator.defaultProps = {};

export default Paginator;
