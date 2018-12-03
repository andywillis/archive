import { h } from 'preact';
import classNames from 'classnames';

import Button from '../Button';
import Chart from '../Chart';

import style from './style.css';

class Gauge extends Chart {

  constructor() {
    super();
    this.setState({ dataValid: true });
    this.init = this.init.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getCurrencySymbols();
    this.init();
  }

  handleClick() {
    this.init();
  }

  async getCurrencySymbols() {
    const currencySymbols = await this.getData('/currencySymbols');
    this.setState({ currencySymbols });
  }

  async init() {
    const data = await this.getData('https://widgister.herokuapp.com/challenge/frontend');
    if (data) {
      this.setState({
        data,
        dataValid: this.validateData(data) ? true : false
      });
    }
  }

  formatLabel(format, unit, value) {
    return format && format === 'currency'
      ? `${this.state.currencySymbols[unit]} ${value}`
      : value;
  }

  validateData(data) {
    const { value, min, max } = data;
    if (value < min) return false;
    if (value > max) return false;
    if (min >= max) return false;
    return true;
  }

  render() {

    const {
      browserStyle, data, currencySymbols, dataValid
    } = this.state;

    if (data && currencySymbols) {

      const {
        min, max, value, format, unit
      } = data;

      const percentage = ((value - min) * 100) / (max - min);
      const rotation = -Math.abs(180 - ((180 / 100) * percentage));
      const valTxt = dataValid ? this.formatLabel(format, unit, value) : '-';
      const minTxt = dataValid ? this.formatLabel(format, unit, min) : '-';
      const maxTxt = dataValid ? this.formatLabel(format, unit, max) : '-';

      const needleStyle = { [browserStyle]: `rotate(${rotation}deg)` };

      return (
        <div id={style.gauge}>
          <div class={classNames(style.gauge, style.gauge__liveupdate)}>
            <div class={style.label__value}>{valTxt}</div>
            <div class={style.container}>
              <div class={style.background} />
              <div class={style.center} />
              <div class={style.needle} style={dataValid && needleStyle} />
              <div class={style.anchor} />
            </div>
            <div class={style.labels}>
              <span class={style.label__min}>{minTxt}</span>
              <span class={style.label__max}>{maxTxt}</span>
            </div>
          </div>
          <Button
            handleClick={this.handleClick}
            txt={dataValid ? 'Click for more data' : 'Data invalid. Try again.'}
          />
        </div>
      );

    }

    return 'No data available. F5 to refresh.';

  }

}


export default Gauge;
