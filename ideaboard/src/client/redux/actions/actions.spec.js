import {
  deleteIdea,
  changeOrder
} from './index';

it('should create an action to change list order', () => {
  const order = 'timestamp';
  const expectedOrder = {
    type: 'CHANGE_ORDER',
    order
  };
  expect(changeOrder(order)).toMatchObject(expectedOrder);
});

it('should create an action to delete an idea', () => {
  const id = 1;
  const expectedDelete = {
    type: 'DELETE_IDEA',
    id
  };
  expect(deleteIdea(id)).toMatchObject(expectedDelete);
});
