const fs = require('fs');

function getSortedInstances(arr) {
  const data = arr.reduce((p, c) => {
    p[c] = (p[c] || 0) + 1;
    return p;
  }, {});

  let result = [];
  Object.entries(data).forEach((el) => {
    result.push([+el[0], el[1]]);
  });

  result.sort((a, b) => b[1] - a[1]);
  return result.slice(0, 5).map(([el]) => el).join('\n');
}

fs.readFile('test.txt', 'utf8', (err, data) => {
  if (err) throw err;
  const match = data.match(/[-+]?[0-9]*\.?[0-9]+/g).map(parseFloat);
  const instances = getSortedInstances(match);
  console.log(instances);
});
