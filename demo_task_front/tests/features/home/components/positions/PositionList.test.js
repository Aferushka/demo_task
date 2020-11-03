import React from 'react';
import { shallow } from 'enzyme';
import { PositionList } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PositionList />);
  expect(renderedComponent.find('.home-position-list').length).toBe(1);
});
