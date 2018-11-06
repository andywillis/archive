const markdown = require('markdown').markdown;

function wrangleHeader(key, el) {
  const header = document.createElement('h1');
  const link = document.createElement('a');
  link.href = key;
  link.text = el.getElementsByTagName('h1')[0].innerText;
  header.appendChild(link);
  return header;
}

function wrangleDate(el) {
  const date = document.createElement('h2');
  date.innerHTML = el.getElementsByTagName('h2')[0].innerText;
  return date;
}

function wrangleParas(el) {
  const paras = el.getElementsByTagName('p');
  return paras;
}

function wrangleTags(el) {
  const tagList = document.createElement('ul');
  const tags = el.getElementsByTagName('li');
  [...tags].forEach(tag => tagList.appendChild(tag));
  return tagList;
}

function wrangleData(document, data) {
  return data.map((el) => {
    const key = el.key;
    const temp = document.createElement('div');
    temp.innerHTML = markdown.toHTML(el.md);
    const frag = document.createElement('div');
    frag.appendChild(wrangleHeader(key, temp));
    frag.appendChild(wrangleDate(temp));
    [...wrangleParas(temp)].forEach(para => frag.appendChild(para));
    frag.appendChild(wrangleTags(temp));
    return { key, html: frag.innerHTML };
  });
}

export default wrangleData;
