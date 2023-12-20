"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsReportInstanceProvider = void 0;
const constants_1 = require("../../constants");
const useFactory = async (options) => {
    const _a = options.config || {}, { extensions: extensionOpts = {} } = _a, rest = __rest(_a, ["extensions"]);
    console.log('js report instance factory');
    const jsReport = require('@jsreport/jsreport-core')(Object.assign(Object.assign({ loadConfig: false, allowLocalFilesAccess: true, autoTempCleanup: true, discover: false }, rest), { trustUserCode: true, templatingEngines: { allowedModules: '*', strategy: 'in-process' }, extensions: Object.assign(Object.assign({ 'html-to-xlsx': {
                launchOptions: {
                    headless: 'new',
                },
            }, 'chrome-pdf': {
                timeout: 90000,
                launchOptions: {
                    headless: true,
                    args: ['--no-sandbox'],
                },
            }, chrome: {
                launchOptions: {
                    headless: true,
                    args: ['--no-sandbox'],
                },
            } }, extensionOpts), { express: {
                enabled: false,
            }, studio: {
                enabled: false,
            }, assets: {
                allowedFiles: '**/*.*',
            } }) }));
    jsReport.use(require('@jsreport/jsreport-assets')());
    jsReport.use(require('@jsreport/jsreport-scripts')());
    jsReport.use(require('@jsreport/jsreport-components')());
    jsReport.rootOptions = options;
    let engines = options.engines;
    if (!engines) {
        engines = ['handlebars'];
    }
    const extensions = (options.extensions || []).filter((extension) => {
        if (['assets', 'scripts', 'components'].includes(extension)) {
            return false;
        }
        return true;
    });
    const recipes = options.recipes || [];
    for (const extension of extensions) {
        jsReport.use(require(`@jsreport/jsreport-${extension}`)());
    }
    for (const engine of engines) {
        jsReport.use(require(`@jsreport/jsreport-${engine}`)());
    }
    for (const recipe of recipes) {
        jsReport.use(require(`@jsreport/jsreport-${recipe}`)());
    }
    await jsReport.init();
    return jsReport;
};
const getJsReportInstanceProvider = (options) => {
    return {
        provide: constants_1.JSREPORT_INSTANCE_TOKEN,
        useFactory: async () => useFactory(options),
        inject: [constants_1.JSREPORT_ROOT_OPTIONS_TOKEN],
    };
};
exports.getJsReportInstanceProvider = getJsReportInstanceProvider;
//# sourceMappingURL=index.js.map