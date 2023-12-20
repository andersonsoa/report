"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templates = void 0;
function setupTemplates(templateOptions) {
    return templateOptions.map((templateOption) => {
        var _a, _b;
        return ({
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
                ...((_a = templateOption.assets) !== null && _a !== void 0 ? _a : []),
            ],
            template: {
                recipe: 'chrome-pdf',
                engine: 'handlebars',
                content: `templates/${templateOption.name}/template.html${(_b = templateOption.extension) !== null && _b !== void 0 ? _b : '.hbs'}`,
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
                    footerTemplate: '<div style="width: 100%; font-size: 6px; display: flex; justify-content: center;">Página&nbsp;<span class="pageNumber"></span>&nbsp;de&nbsp;<span class="totalPages"></span></div>',
                },
            },
        });
    });
}
exports.templates = setupTemplates([
    { name: 'consolidado' },
    { name: 'bens-achados' },
    { name: 'sintetico' },
    { name: 'bens-serviveis' },
    { name: 'bens-inserviveis' },
    { name: 'contas-contabeis' },
    { name: 'bens-nao-localizados' },
    { name: 'acervo-fotografico' },
]);
//# sourceMappingURL=templates.js.map