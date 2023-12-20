"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const joi_1 = __importDefault(require("joi"));
const config_1 = require("@nestjs/config");
const reports_module_1 = require("./modules/reports/reports.module");
const lib_1 = require("./lib");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: joi_1.default.object({
                    NODE_ENV: joi_1.default.string()
                        .valid('development', 'staging', 'production')
                        .default('development'),
                    PORT: joi_1.default.number().default(3000),
                }),
            }),
            lib_1.JsReportModule.forRoot({
                engines: ['handlebars'],
                recipes: ['chrome-pdf'],
                extensions: ['unoconv', 'pdf-utils'],
            }),
            reports_module_1.ReportsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map