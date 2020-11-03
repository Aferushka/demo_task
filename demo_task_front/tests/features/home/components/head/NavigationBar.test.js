import React from 'react';
import { shallow } from 'enzyme';
import { NavigationBar } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<NavigationBar />);
  expect(renderedComponent.find('.home-navigation-bar').length).toBe(1);
});
