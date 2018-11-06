export const getImageName = (url) => {
  return `http://${url.substr(2).replace('thumbnail', 'large')}`;
}
