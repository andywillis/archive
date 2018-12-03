import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { shallow } from 'enzyme';

import { IdeaForm } from './index';

import store from '../../redux/store';

const idea = {
  id: '9d468631-a0f0-41dd-bc60-b9b773b83ec1',
  title: 'Improve update notification',
  text: 'Perhaps add &quot;saved&quot; to the timestamp box, then apply the updated timestamp.',
  timestamp: 'Fri, 23 Nov 2018 16:19:27 GMT'
};

const wrapper = shallow(<IdeaForm idea={idea} ok="Hi" />);

it('renders an single text input', () => {
  expect(wrapper.find('input')).toHaveLength(1);
});

it('renders an single textarea', () => {
  expect(wrapper.find(TextareaAutosize)).toHaveLength(1);
});

it('renders two buttons', () => {
  expect(wrapper.find('button')).toHaveLength(2);
});