import React from 'react';
import { shallow } from 'enzyme';
import { BaseContainer } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<BaseContainer />);
  expect(renderedComponent.find('.home-base-container').length).toBe(1);
});
