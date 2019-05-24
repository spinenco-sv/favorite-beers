import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Container,
  Form,
  Input,
  FormGroup,
  Label,
  PaginationLink,
  Pagination,
  PaginationItem,
  Row,
} from 'reactstrap';

import Beer from '../Product';
import { generateYears, generateMonths, filterBeers } from '../../utils';


const FavoriteBeers = (props) => {
  const {
    beersPerPage,
    defaultYear,
  } = props;

  const [currentPage, setPage] = useState(1);
  const indexOfLastBeer = currentPage * beersPerPage;
  const indexOfFirstTodo = indexOfLastBeer - beersPerPage;


  const [fromMonth, setFromMonth] = useState(1);
  const [toMonth, setToMonth] = useState(1);

  const [fromYear, setFromYear] = useState(defaultYear);
  const [toYear, setToYear] = useState(new Date().getFullYear());
  const years = generateYears(defaultYear);
  const months = generateMonths();

  // Fetch first time beers
  const [beers, setBeers] = useState([]);
  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers')
      .then(response => response.json())
      .then(d => setBeers(d));
  }, []);

  // Filter beers based un period
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
      setPage(1);
    },
    [
      beers,
      fromYear,
      toYear,
      fromMonth,
      toMonth,
    ],
  );

  // Paginate beers
  const currentBeers = filteredBeers.slice(indexOfFirstTodo, indexOfLastBeer);


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBeers.length / beersPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Row>
        <Col sm="12" lg={{ size: 10, offset: 1 }}>
          <div className="mb-5 p-3 border border-1 border-dark">
            <Form>
              <Row className="align-items-center">
                <Col sm={12} md={2}>
                  <strong>First Brewed</strong>
                </Col>
                <Col sm={12} md={5}>
                  <Row form className="align-items-center">
                    <Col sm={12} md={4} className="text-center">
                      <span className="text-uppercase">between</span>
                    </Col>
                    <Col sm={4} md={3}>
                      <FormGroup>
                        <Label for="fromMonth" className="text-uppercase">Month</Label>
                        <Input type="select" onChange={e => setFromMonth(e.target.value)} id="fromMonth">
                          {months.map(month => (
                            <option value={month}>
                              {month < 10 ? '0' : ''}
                              {month}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col sm={8} md={5}>
                      <FormGroup>
                        <Label for="fromYear" className="text-uppercase">Year</Label>
                        <Input type="select" onChange={e => setFromYear(e.target.value)} id="fromYear">
                          {years.map(year => (
                            <option value={year} selected={year === fromYear}>
                              {year}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} md={5}>
                  <Row form className="align-items-center">
                    <Col sm={12} md={4} className="text-center">
                      <span className="text-uppercase">and</span>
                    </Col>
                    <Col sm={4} md={3}>
                      <FormGroup>
                        <Label for="toMonth" className="text-uppercase">Month</Label>
                        <Input type="select" onChange={e => setToMonth(e.target.value)} id="toMonth">
                          {months.map(month => (
                            <option value={month}>
                              {month < 10 ? '0' : ''}
                              {month}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col sm={8} md={5}>
                      <FormGroup>
                        <Label for="toYear" className="text-uppercase">Year</Label>
                        <Input type="select" onChange={e => setToYear(e.target.value)} id="toYear">
                          {years.map(year => (
                            <option value={year} selected={year === toYear}>
                              {year}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
      { currentBeers.length > 0 && (
        <Row className="row-eq-height">
          {currentBeers.map(beer => (
            <Col sm="12" md="6">
              <Beer {...beer} key={`beer-${beer.id}`} />
            </Col>
          ))}
        </Row>
      )
      }
      { beers.length > 0 && filteredBeers.length === 0 && (
        <h3 className="text-danger text-center">No beers found based on selected period</h3>
      )
      }
      { pageNumbers.length > 0 && (
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
      )
      }
    </Container>
  );
};

FavoriteBeers.propTypes = {
  beersPerPage: PropTypes.number,
  defaultYear: PropTypes.number,
};

FavoriteBeers.defaultProps = {
  beersPerPage: 4,
  defaultYear: 1950,
};

export default FavoriteBeers;
