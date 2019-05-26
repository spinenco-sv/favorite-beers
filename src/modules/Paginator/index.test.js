import React from  'react';
import { mount } from 'enzyme';
import { PaginationItem } from 'reactstrap';
import Paginator from './index.jsx';

const clickFn = jest.fn();


describe('Test Paginator module', () => {
  let wrapper;
  const props = {
    itemsLength: 50,
    itemsPerPage: 5,
    onPageChange: clickFn
  };

  beforeEach(() => {
    wrapper = mount(<Paginator {...props} />);
  });

  it('On page click should call onPageChange function', () => {
    wrapper
      .find('PaginationLink').at(3)
      .simulate('click');
    expect(clickFn).toHaveBeenCalled();

    expect(wrapper.find('PaginationLink').at(3).text()).toEqual('3');
  });

  it('Should display correct page number', () => {
    expect(wrapper.find('PaginationLink').at(3).text()).toEqual('3');
    expect(wrapper.find('PaginationLink').at(1).text()).toEqual('1');
    expect(wrapper.find('PaginationLink').at(0).text()).not.toBe('0');
  });


  it('Should display correct number of pages', () => {
    const pages = Math.ceil(props.itemsLength / props.itemsPerPage) + 2;
    expect(wrapper.find(PaginationItem).length).toBe(pages);
  });
});