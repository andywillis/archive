function fbCheck(n, d) {
  return n % d === 0 || n.toString().indexOf(d) > - 1;
}

for (let i = 1; i <= 100; i++) {
  const has3 = fbCheck(i, 3);
  const has5 = fbCheck(i, 5);
  if (has3 || has5) {
    if (has3 && has5) {
      console.log(i, 'Fizz Buzz');
    } else {
      if (has3) console.log(i, 'Fizz');
      if (has5) console.log(i, 'Buzz');
    }
  } else {
    console.log(i);
  }
}