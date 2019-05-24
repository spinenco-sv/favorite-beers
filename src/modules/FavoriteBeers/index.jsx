import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Container,
  Form,
  Input,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';

import Beer from '../Product';
import Paginator from '../Paginator';

import { generateYears, generateMonths, filterBeers } from '../../utils';


const FavoriteBeers = (props) => {
  const {
    beersPerPage,
    defaultYear,
  } = props;

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

  // Filter beers based on period
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

  const [currentPageBeers, setCurrentPageBeers] = useState([]);
  const onPageChange = (firstIndex, lastIndex) => setCurrentPageBeers(
    filteredBeers.slice(firstIndex, lastIndex),
  );

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
                            <option value={month} key={month}>
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
                        <Input
                          defaultValue={fromYear}
                          type="select"
                          onChange={e => setFromYear(e.target.value)}
                          id="fromYear"
                        >
                          {years.map(year => (
                            <option value={year} key={year}>
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
                            <option value={month} key={month}>
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
                        <Input type="select" defaultValue={toYear} onChange={e => setToYear(e.target.value)} id="toYear">
                          {years.map(year => (
                            <option value={year} key={year}>
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
      { currentPageBeers.length > 0 && (
        <Row className="row-eq-height">
          {currentPageBeers.map(beer => (
            <Col sm="12" md="6" key={`beer-${beer.id}`}>
              <Beer {...beer} />
            </Col>
          ))}
        </Row>
      )
      }
      { beers.length > 0 && filteredBeers.length === 0 && (
        <h3 className="text-danger text-center">No beers found based on selected period</h3>
      )
      }
      <Paginator
        itemsLength={filteredBeers.length}
        itemsPerPage={beersPerPage}
        onPageChange={onPageChange}
      />
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
