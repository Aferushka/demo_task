import React from 'react';
import { shallow } from 'enzyme';
import { NavigationHead } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<NavigationHead />);
  expect(renderedComponent.find('.common-navigation-head').length).toBe(1);
});
