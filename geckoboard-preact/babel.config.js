module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    presets: [
      ['@babel/preset-env', {
        modules: false
      }]
    ],
    plugins: [
      ['@babel/plugin-transform-regenerator'],
      ['@babel/plugin-transform-react-jsx', { pragma: 'h' }]
    ],
    env: {
      test: {
        presets: [
          '@babel/preset-env'
        ]
      }
    }
  };
};
