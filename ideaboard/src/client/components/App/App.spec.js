import React from 'react';
import { shallow } from 'enzyme';

import App from './index';

const wrapper = shallow(<App />);

it('renders two sections', () => {
  expect(wrapper.find('section')).toHaveLength(2);
});
