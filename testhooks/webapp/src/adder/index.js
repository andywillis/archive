function adder(a) {
  return function mapper(el) {
    return el + a + a + a;
  };
}

module.exports = adder;
