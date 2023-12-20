import { StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { JsReportTemplateService } from 'src/lib';
export declare class ReportsController {
    readonly consolidadoService: JsReportTemplateService;
    readonly bensAchadosService: JsReportTemplateService;
    readonly sinteticoService: JsReportTemplateService;
    readonly bensServiveisService: JsReportTemplateService;
    readonly bensInserviveisService: JsReportTemplateService;
    readonly contasContabeisService: JsReportTemplateService;
    readonly bensNaoLocalizadosService: JsReportTemplateService;
    readonly acervoFotograficoService: JsReportTemplateService;
    constructor(consolidadoService: JsReportTemplateService, bensAchadosService: JsReportTemplateService, sinteticoService: JsReportTemplateService, bensServiveisService: JsReportTemplateService, bensInserviveisService: JsReportTemplateService, contasContabeisService: JsReportTemplateService, bensNaoLocalizadosService: JsReportTemplateService, acervoFotograficoService: JsReportTemplateService);
    consolidado(res: Response, data: any): Promise<StreamableFile>;
    bensAchados(res: Response, data: any): Promise<StreamableFile>;
    sintetico(res: Response, data: any): Promise<StreamableFile>;
    bensServiveis(res: Response, data: any): Promise<StreamableFile>;
    bensInserviveis(res: Response, data: any): Promise<StreamableFile>;
    contasContabeis(res: Response, data: any): Promise<StreamableFile>;
    bensNaoLocalizados(res: Response, data: any): Promise<StreamableFile>;
    acervoFotografico(res: Response, data: any): Promise<StreamableFile>;
}
