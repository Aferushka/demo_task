import React from 'react';
import { shallow } from 'enzyme';
import { ListHandler } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ListHandler />);
  expect(renderedComponent.find('.common-list-handler').length).toBe(1);
});
