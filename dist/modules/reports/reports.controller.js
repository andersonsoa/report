"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const lib_1 = require("../../lib");
let ReportsController = class ReportsController {
    constructor(consolidadoService, bensAchadosService, sinteticoService, bensServiveisService, bensInserviveisService, contasContabeisService, bensNaoLocalizadosService, acervoFotograficoService) {
        this.consolidadoService = consolidadoService;
        this.bensAchadosService = bensAchadosService;
        this.sinteticoService = sinteticoService;
        this.bensServiveisService = bensServiveisService;
        this.bensInserviveisService = bensInserviveisService;
        this.contasContabeisService = contasContabeisService;
        this.bensNaoLocalizadosService = bensNaoLocalizadosService;
        this.acervoFotograficoService = acervoFotograficoService;
    }
    async consolidado(res, data) {
        res.set({
            'Content-Type': 'application/pdf; charset=utf-8',
        });
        const result = await this.consolidadoService.getStream(Object.assign({ titulo: 'Relatório Consolidado Final' }, data));
        return new common_1.StreamableFile(result.content);
    }
    async bensAchados(res, data) {
        res.set({
            'Content-Type': 'application/pdf; charset=utf-8',
        });
        const result = await this.bensAchadosService.getStream(Object.assign({ titulo: 'Relatório de Bens Achados' }, data));
        return new common_1.StreamableFile(result.content);
    }
    async sintetico(res, data) {
        res.set({
            'Content-Type': 'application/pdf; charset=utf-8',
        });
        const result = await this.sinteticoService.getStream(Object.assign({ titulo: 'Relatório Sintético' }, data));
        return new common_1.StreamableFile(result.content);
    }
    async bensServiveis(res, data) {
        res.set({
            'Content-Type': 'application/pdf; charset=utf-8',
        });
        const result = await this.bensServiveisService.getStream(Object.assign({ titulo: 'Relatório de Bens Servíveis' }, data));
        return new common_1.StreamableFile(result.content);
    }
    async bensInserviveis(res, data) {
        res.set({
            'Content-Type': 'application/pdf; charset=utf-8',
        });
        const result = await this.bensInserviveisService.getStream(Object.assign({ titulo: 'Relatório de Bens Inservíveis' }, data));
        return new common_1.StreamableFile(result.content);
    }
    async contasContabeis(res, data) {
        const result = await this.contasContabeisService.getStream(Object.assign({ titulo: 'Relatório de Contas Contábeis' }, data));
        return new common_1.StreamableFile(result.content);
    }
    async bensNaoLocalizados(res, data) {
        const result = await this.bensNaoLocalizadosService.getStream(Object.assign({ titulo: 'Relatório de Bens Não Localizados' }, data));
        return new common_1.StreamableFile(result.content);
    }
    async acervoFotografico(res, data) {
        res.set({
            'Content-Type': 'application/pdf; charset=utf-8',
        });
        const result = await this.acervoFotograficoService.getStream(Object.assign({ titulo: 'Relatório de Acervo Fotográfico' }, data));
        return new common_1.StreamableFile(result.content);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Post)('consolidado'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "consolidado", null);
__decorate([
    (0, common_1.Post)('bens-achados'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "bensAchados", null);
__decorate([
    (0, common_1.Post)('sintetico'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "sintetico", null);
__decorate([
    (0, common_1.Post)('bens-serviveis'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "bensServiveis", null);
__decorate([
    (0, common_1.Post)('bens-inserviveis'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "bensInserviveis", null);
__decorate([
    (0, common_1.Post)('contas-contabeis'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Header)('content-type', 'application/pdf; charset=utf-8'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "contasContabeis", null);
__decorate([
    (0, common_1.Post)('bens-nao-localizados'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Header)('content-type', 'application/pdf; charset=utf-8'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "bensNaoLocalizados", null);
__decorate([
    (0, common_1.Post)('acervo-fotografico'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "acervoFotografico", null);
exports.ReportsController = ReportsController = __decorate([
    (0, common_1.Controller)('reports'),
    __param(0, (0, lib_1.InjectJsrTemplate)('consolidado')),
    __param(1, (0, lib_1.InjectJsrTemplate)('bens-achados')),
    __param(2, (0, lib_1.InjectJsrTemplate)('sintetico')),
    __param(3, (0, lib_1.InjectJsrTemplate)('bens-serviveis')),
    __param(4, (0, lib_1.InjectJsrTemplate)('bens-inserviveis')),
    __param(5, (0, lib_1.InjectJsrTemplate)('contas-contabeis')),
    __param(6, (0, lib_1.InjectJsrTemplate)('bens-nao-localizados')),
    __param(7, (0, lib_1.InjectJsrTemplate)('acervo-fotografico')),
    __metadata("design:paramtypes", [lib_1.JsReportTemplateService,
        lib_1.JsReportTemplateService,
        lib_1.JsReportTemplateService,
        lib_1.JsReportTemplateService,
        lib_1.JsReportTemplateService,
        lib_1.JsReportTemplateService,
        lib_1.JsReportTemplateService,
        lib_1.JsReportTemplateService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map