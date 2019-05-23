import React, { useState } from 'react';
import {
  Col,
  Container,
  PaginationLink,
  Pagination,
  PaginationItem,
  Row,
} from 'reactstrap';
import './style.scss';

import Beer from '../Product';
import useFetch from '../../utils/useFetch';
import { generateYears, generateMonths } from '../../utils/date';

const FavoriteBeers = () => {
  const [currentPage, setPage] = useState(1);
  const beersPerPage = 4;
  const indexOfLastBeer = currentPage * beersPerPage;
  const indexOfFirstTodo = indexOfLastBeer - beersPerPage;

  const beers = useFetch('http://localhost:8084/beers.json', []);
  const currentBeers = beers.slice(indexOfFirstTodo, indexOfLastBeer);

  const years = generateYears(1900);
  const months = generateMonths();

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(beers.length / beersPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <div className="Filter">
            <Row className="align-items-center">
              <Col sm="12" md="4">First Brewed</Col>
              <Col sm="12" md="4">
                <span className="mr-1 text-uppercase">between</span>
                <select>
                  {months.map(month => (<option value={month}>{month}</option>))}
                </select>
                <select>
                  {years.map(year => (<option value={year}>{year}</option>))}
                </select>
              </Col>
              <Col sm="12" md="4">
                <span className="mr-1 text-uppercase">and</span>
                <select>
                  {months.map(month => (<option value={month}>{month}</option>))}
                </select>
                <select>
                  {years.map(year => (<option value={year}>{year}</option>))}
                </select>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        {currentBeers.map(beer => (
          <Col sm="12" md="6">
            <Beer {...beer} key={`beer-${beer.id}`} />
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center">
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
    </Container>
  );
};

export default FavoriteBeers;
