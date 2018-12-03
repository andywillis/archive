import Chart from './Chart.js';

class Gauge extends Chart {

  /**
   * Creates an instance of Gauge which extends `Chart`
   * @param {HTMLDivElement} el
   * @memberof Gauge
   */
  constructor(el) {
    super(el);
    this.init = this.init.bind(this);
    this.render();
    const elements = this.setUpDOM();
    this.state = { ...this.state, dom: { ...this.state.dom, ...elements } };
  }

  /**
   * Captures the elements affected by this component
   * @returns object
   * @memberof Gauge
   */
  setUpDOM() {
    const button = this.qs('.button');
    const needle = this.qs('.needle');
    const minLabel = this.qs('.label__min');
    const maxLabel = this.qs('.label__max');
    const valLabel = this.qs('.label__value');
    button.addEventListener('click', this.init, false);
    return {
      button, needle, minLabel, maxLabel, valLabel
    };
  }

  /**
   * Grabs the currency symbol data, and the data for the chart
   * and adds them to the state.
   * @memberof Gauge
   */
  async init() {
    const currencySymbols = await this.getData('data/currencySymbolMap.json');
    const data = await this.getData('https://widgister.herokuapp.com/challenge/frontend');
    if (data) {
      this.state = { ...this.state, data, currencySymbols };
      this.update();
    }
  }

  /**
   * The data is often flawed. This eliminates the
   * data where the value is less than the minimum, or
   * greater than the maximun, or where the minumum range value
   * is higher than the maximum range value
   * @static
   * @param {Object} data
   * @returns Boolean
   * @memberof Gauge
   */
  validateData(data) {
    const { value, min, max } = data;
    if (value < min) return false;
    if (value > max) return false;
    if (min >= max) return false;
    return true;
  }

  /**
   * Renders the template to the DOM
   * @memberof Gauge
   */
  render() {

    const html = `
      <div class="gauge gauge__liveupdate">
        <div class="label__value">&nbsp;</div>
        <div class="container">
          <div class="background"></div>
          <div class="center"></div>
          <div class="needle"></div>
          <div class="anchor"></div>
        </div>
        <div class="labels">
          <span class="label__min"></span>
          <span class="label__max"></span>
        </div>
      </div>
      <button class="button">Click for more data</button>
    `;

    const { el } = this.state.dom;
    el.insertAdjacentHTML('beforeend', html);

  }

  /*
   * Helper to format the gauge labels correctly
   * @param {String} format
   * @param {String} unit
   * @param {Float} value
   * @returns
   * @memberof Gauge
   */
  formatLabel(format, unit, value) {
    return format && format === 'currency'
      ? `${this.state.currencySymbols[unit]} ${value}`
      : value;
  }

  /**
   * Updates the chart with each button click
   * It recalculates the needle position, and updates
   * the gauge labels
   * @memberof Gauge
   */
  update() {

    const { data } = this.state;

    if (data) {

      if (!this.validateData(data)) {

        const { button } = this.state.dom;
        button.textContent = 'Data invalid. Try again.';

      } else {

        const {
          min, max, value, format, unit
        } = data;

        const percentage = ((value - min) * 100) / (max - min);
        const rotation = -Math.abs(180 - ((180 / 100) * percentage));
        const valTxt = this.formatLabel(format, unit, value);
        const minTxt = this.formatLabel(format, unit, min);
        const maxTxt = this.formatLabel(format, unit, max);

        const {
          browserStyle,
          dom: {
            needle, minLabel, maxLabel, valLabel, button
          }
        } = this.state;

        valLabel.textContent = valTxt;
        minLabel.textContent = minTxt;
        maxLabel.textContent = maxTxt;
        needle.style[browserStyle] = `rotate(${rotation}deg)`;
        button.textContent = 'Click for more data';

      }

    }

  }

}

export default Gauge;
