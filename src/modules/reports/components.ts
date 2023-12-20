function setupComponents(options: Array<{ name: string }>) {
  return options.map((op) => ({
    folder: __dirname,
    name: op.name,
    initialize: true,
    template: {
      recipe: 'chrome-pdf',
      engine: 'handlebars',
      content: `components/${op.name}/template.html.hbs`,
      helpers: 'templates/common/helpers.js',
    },
  }));
}

export const components = setupComponents([{ name: 'header' }]);
