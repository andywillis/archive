import { sortData } from '../../lib/wrangleData';

const data = [
  { Name: 'B' },
  { Name: 'A' },
  { Name: 'R' },
  { Name: 'G' }
];

const expected = [
  { Name: 'A' },
  { Name: 'B' },
  { Name: 'G' },
  { Name: 'R' }
];

const sortOrder = 'SORT_BY_NAME';

it('returns a sorted array - string', () => {
  expect(sortData(data, sortOrder)).toEqual(expected);
});
