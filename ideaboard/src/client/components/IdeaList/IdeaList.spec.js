import React from 'react';
import { shallow } from 'enzyme';

import IdeaForm from '../IdeaForm';
import IdeaList from './index';

const ideas = [
  {
    id: '9d468631-a0f0-41dd-bc60-b9b773b83ec1',
    title: 'Improve update notification',
    text: 'Perhaps add &quot;saved&quot; to the timestamp box, then apply the updated timestamp.',
    timestamp: 'Fri, 23 Nov 2018 16:19:27 GMT'
  },
  {
    id: 'e4848a55-c38d-444b-8c23-b9073987d6c0',
    title: 'Add idea ordering',
    text: 'By timestamp, and alphabetically by title.',
    timestamp: 'Fri, 23 Nov 2018 17:09:12 GMT'
  }
];

it('renders a list of two ideas', () => {
  const wrapper = shallow(<IdeaList ideas={ideas} />);
  expect(wrapper.find(IdeaForm)).toHaveLength(2);
});
