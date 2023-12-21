type TemplateOptions = {
  name: string;
  extension?: string;
  assets?: Array<{ name: string; path: string }>;
};

function setupTemplates(templateOptions: Array<TemplateOptions>) {
  return templateOptions.map((templateOption) => ({
    folder: __dirname,
    initialize: true,
    name: templateOption.name,
    assets: [
      {
        name: `${templateOption.name}-base.css`,
        path: 'templates/common/base.css',
      },
      {
        name: `${templateOption.name}-brasao.png`,
        path: 'templates/common/brasao.png',
      },
      ...(templateOption.assets ?? []),
    ],
    template: {
      recipe: 'chrome-pdf',
      engine: 'handlebars',
      content: `templates/${templateOption.name}/template.html${
        templateOption.extension ?? '.hbs'
      }`,
      helpers: 'templates/common/helpers.js',
      chrome: {
        launchOptions: {
          args: ['--no-sandbox'],
        },
        printBackground: true,
        marginTop: '1cm',
        marginRight: '1cm',
        marginBottom: '1cm',
        marginLeft: '1cm',
        displayHeaderFooter: true,
        headerTemplate: '<span class="date" style="display: none;">',
        footerTemplate:
          '<div style="width: 100%; font-size: 6px; display: flex; justify-content: center;">Página&nbsp;<span class="pageNumber"></span>&nbsp;de&nbsp;<span class="totalPages"></span></div>',
      },
    },
  }));
}

export const templates = setupTemplates([
  { name: 'teste' },
  { name: 'teste-2' },
]);
