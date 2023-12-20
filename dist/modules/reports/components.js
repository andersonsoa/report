"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.components = void 0;
function setupComponents(options) {
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
exports.components = setupComponents([{ name: 'header' }]);
//# sourceMappingURL=components.js.map