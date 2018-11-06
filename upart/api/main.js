(function () {

  let maindata = null;

  const dataSection = document.querySelector('section.output');
  const buttons = document.querySelectorAll('button');
  const loader = document.querySelector('.loader');

  function padUrl(url) {
    return `<a href="${url}">${url}<a>`;
  }

  function buildRows(data) {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
    return Object.entries(data).reduce((p, c) => {
      const key = c[0];
      const value = urlRegex.test(c[1]) ? padUrl(c[1]) : c[1];
      return [...p, `<tr><td>${key}</td><td>${value}</td></tr>`];
    }, []).join('');
  }

  function displayData(viewType) {
    let output = null;
    if (viewType === 'table') {
      const rows = buildRows(maindata);
      const thead = '<th>Key</th><th>Value</th>';
      output = `<table>${thead}<tbody>${rows}</tbody></table>`;
    } else {
      const data = JSON.stringify(maindata, null, 2);
      output = `<table><tr><td><code><pre>${data}</pre></code></td></tr></table>`;
    }
    dataSection.innerHTML = output;
  }

  function displayError(text) {
    dataSection.innerHTML = `<table><tr><td>${text}</td></tr></table>`;
  }

  function handleButton() {
    buttons.forEach(button => button.classList.remove('active'));
    this.classList.add('active');
    if (maindata) {
      displayData(this.dataset.type);
    } else {
      displayError('No data found');
    }
  }

  buttons.forEach((button) => { button.addEventListener('click', handleButton, false); });

  function getData() {
    loader.classList.add('active');
    fetch('https://api.github.com/users/unipartdigital')
      .then((response) => {
        loader.classList.remove('active');
        if (response.ok) return response.json();
        throw new Error();
      })
      .then((data) => {
        maindata = data;
        displayData('table');
      })
      .catch(() => {
        loader.classList.remove('active');
        displayError('No data found')
      });
  }

  getData();

}());
