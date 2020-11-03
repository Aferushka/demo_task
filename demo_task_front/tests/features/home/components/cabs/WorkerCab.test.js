import React from 'react';
import { shallow } from 'enzyme';
import { WorkerCab } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<WorkerCab />);
  expect(renderedComponent.find('.home-worker-cab').length).toBe(1);
});
