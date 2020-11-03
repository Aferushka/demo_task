import React from 'react';
import { shallow } from 'enzyme';
import { AdminCab } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AdminCab />);
  expect(renderedComponent.find('.home-admin-cab').length).toBe(1);
});
