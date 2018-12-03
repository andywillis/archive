import Preact, { h, Component } from 'preact';

class Chart extends Component {

  constructor() {
    super();
    const browserStyle = this.getTransformStyle();
    this.state = { browserStyle };
  }

  getTransformStyle() {
    const { body } = document;
    const styles = [ 'webkitTransform', 'mozTransform', 'msTransform', 'oTransform', 'transform' ];
    return styles.find(style => typeof body.style[style] !== 'undefined');
  }

  async getData(endpoint) {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

}

export default Chart;
