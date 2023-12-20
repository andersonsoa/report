"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentToken = exports.getTemplateToken = exports.getInstanceToken = exports.getComponentOptionsToken = exports.getTemplateOptionsToken = exports.getRootOptionsToken = void 0;
function getRootOptionsToken(name) {
    return name ? `JsReportOptions_${name}` : 'JsReportOptions_default';
}
exports.getRootOptionsToken = getRootOptionsToken;
function getTemplateOptionsToken(name) {
    return name ? `JsReportOptions_${name}` : 'JsReportOptions_default';
}
exports.getTemplateOptionsToken = getTemplateOptionsToken;
function getComponentOptionsToken(name) {
    return name ? `JsReportOptions_${name}` : 'JsReportOptions_default';
}
exports.getComponentOptionsToken = getComponentOptionsToken;
function getInstanceToken(name) {
    return name ? `JsReportInstance_${name}` : 'JsReportInstance_default';
}
exports.getInstanceToken = getInstanceToken;
function getTemplateToken(name) {
    return name ? `JsReportTemplate_${name}` : 'JsReportTemplate_default';
}
exports.getTemplateToken = getTemplateToken;
function getComponentToken(name) {
    return name ? `JsReportComponent_${name}` : 'JsReportComponent_default';
}
exports.getComponentToken = getComponentToken;
//# sourceMappingURL=token.helper.js.map