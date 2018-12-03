class Chart {

  /**
   * Creates an instance of Chart.
   * @param {HTMLDivElement} el
   * @memberof Chart
   */
  constructor(el) {
    this.state = { dom: { el: this.qs(el) } };
    this.state = { ...this.state, browserStyle: this.getTransformStyle() };
  }

  /**
   * query selector
   * @param {string} el
   * @returns HTMLDivElement
   * @memberof Chart
   */
  qs(el) {
    return document.querySelector(el);
  }

  /**
   * Gets the browser style prefix type for transform
   * @returns string
   * @memberof Chart
   */
  getTransformStyle() {
    const { body } = document;
    const styles = [ 'webkitTransform', 'mozTransform', 'msTransform', 'oTransform', 'transform' ];
    return styles.find(style => typeof body.style[style] !== 'undefined');
  }

  /**
   * Returns requrested data
   * @param {*} endpoint
   * @returns Object
   * @memberof Chart
   */
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
