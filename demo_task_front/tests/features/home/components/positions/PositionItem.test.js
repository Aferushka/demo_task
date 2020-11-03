import React from 'react';
import { shallow } from 'enzyme';
import { PositionItem } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PositionItem />);
  expect(renderedComponent.find('.home-position-item').length).toBe(1);
});
