import React, { useState, useEffect } from 'react';
import {
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  PaginationLink,
  Pagination,
  PaginationItem,
  Row,
} from 'reactstrap';
import './style.scss';

import Beer from '../Product';
import { filterBeers } from '../../utils/filters';
import { generateYears, generateMonths } from '../../utils/date';


const FavoriteBeers = () => {
  const [currentPage, setPage] = useState(1);
  const beersPerPage = 4;
  const indexOfLastBeer = currentPage * beersPerPage;
  const indexOfFirstTodo = indexOfLastBeer - beersPerPage;


  const [fromMonth, setFromMonth] = useState(1);
  const [toMonth, setToMonth] = useState(1);

  const defaultYear = 2008;
  const [fromYear, setFromYear] = useState(defaultYear);
  const [toYear, setToYear] = useState(2018);
  const years = generateYears(defaultYear);

  // Fetch first time beers
  const [beers, setBeers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/beers.json')
      .then(response => response.json())
      .then(d => setBeers(d));
  }, []);

  const [filteredBeers, setFilteredBeers] = useState([]);
  useEffect(
    () => {
      setFilteredBeers(
        filterBeers(
          beers,
          `${fromMonth}${'\\'}${fromYear}`,
          `${toMonth}${'\\'}${toYear}`,
        ),
      );
    },
    [
      beers,
      fromYear,
      toYear,
      fromMonth,
      toMonth,
    ],
  );


  const currentBeers = filteredBeers.slice(indexOfFirstTodo, indexOfLastBeer);


  const months = generateMonths();

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBeers.length / beersPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Row>
        <Col sm="12" lg={{ size: 8, offset: 2 }}>
          <div className="Filter">
            <Row className="align-items-center">
              <Col sm="12" md="4">First Brewed</Col>
              <Col sm="12" md="4">
                <span className="mr-1 text-uppercase">between</span>
                <select onChange={e => setFromMonth(e.target.value)}>
                  {months.map(month => (<option value={month}>{month}</option>))}
                </select>
                <select onChange={e => setFromYear(e.target.value)}>
                  {years.map(year => (<option value={year}>{year}</option>))}
                </select>
              </Col>
              <Col sm="12" md="4">
                <span className="mr-1 text-uppercase">and</span>
                <select onChange={e => setToMonth(e.target.value)}>
                  {months.map(month => (<option value={month}>{month}</option>))}
                </select>
                <select onChange={e => setToYear(e.target.value)}>
                  {years.map(year => (<option value={year}>{year}</option>))}
                </select>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row className="row-eq-height">
        {currentBeers.map(beer => (
          <Col sm="12" md="6">
            <Beer {...beer} key={`beer-${beer.id}`} />
          </Col>
        ))}
      </Row>
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
    </Container>
  );
};

export default FavoriteBeers;
