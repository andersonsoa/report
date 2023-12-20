"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentProvider = void 0;
const constants_1 = require("../../constants");
const token_helper_1 = require("../../helpers/token.helper");
const service_1 = require("./service");
const useFactory = async (options, instance) => {
    return new service_1.JsReportComponentService(options, instance);
};
const getComponentProvider = (options) => {
    return {
        provide: (0, token_helper_1.getComponentToken)(options.name),
        useFactory,
        inject: [(0, token_helper_1.getComponentOptionsToken)(options.name), constants_1.JSREPORT_INSTANCE_TOKEN],
    };
};
exports.getComponentProvider = getComponentProvider;
//# sourceMappingURL=index.js.map