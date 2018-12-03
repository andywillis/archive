import React from 'react';
import { shallow } from 'enzyme';

import { OrderIcons } from './index';

const wrapper = shallow(<OrderIcons order="title" />);

it('renders a list...', () => {
  expect(wrapper.find('ul')).toHaveLength(1);
});

it('...containing two buttons', () => {
  expect(wrapper.find('button')).toHaveLength(2);
});
