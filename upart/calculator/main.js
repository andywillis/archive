(function () {

  class Calculator {

    constructor() {
      this.equation = [];
      this.output = document.querySelector('.output');
      this.buttons = document.querySelectorAll('button');
      this.buttons.forEach(el => el.addEventListener('click', this.handleButton.bind(this), false));
    }

    init() {
      this.reset();
    }

    handleButton(e) {
      const value = e.target.textContent;
      switch (value) {
        case 'C':
          this.reset();
          break;
        case '=': {
          const result = this.solveEquation();
          this.displayOutput(result);
          break;
        }
        default:
          if (/[^C=]/.test(value)) {
            this.equation.push(value);
            this.displayOutput(this.equation.join(''));
          }
          break;
      }
    }

    displayOutput(output) {
      this.output.value = output;
      this.equation = [output];
    }

    solveEquation() {
      let output = null;
      const regex = /([-?\d.]{1,})([+\-*/%^√])([-?\d.]{1,})?/;
      const match = this.equation.join('').match(regex);
      const n1 = parseFloat(match[1]);
      const n2 = parseFloat(match[3]);
      switch (match[2]) {
        case '+': output = n1 + n2; break;
        case '-': output = n1 - n2; break;
        case '*': output = n1 * n2; break;
        case '/': output = n1 / n2; break;
        case '%': output = n1 % n2; break;
        case '^': output = n1 ** n2; break;
        case '√': output = Math.sqrt(n1); break;
      }
      return Number.isNaN(output) ? 'Invalid input' : output;
    }

    reset() {
      this.equation = [];
      this.output.value = '';
    }

  }

  const calc = new Calculator();
  calc.init();

}());
