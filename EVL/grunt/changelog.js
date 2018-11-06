module.exports = function (grunt) {
  return {
    sample: {
      options: {
        featureRegex: /^(.*)(.*)(.*)$/gim,
        dest: 'build/Recent commit log.txt',
        template: '{{date}}\n\n{{> features}}{{> fixes}}',
        partials: {
          features: '{{#each features}}{{> feature}}{{/each}}',
          feature: '[NEW] {{this}}\n',
          fixes: '{{#each fixes}}{{> fix}}{{/each}}',
          fix: '[FIX] {{this}}\n'
        }
      }
    }
  };
};
