import { AssetHelper } from '../../helpers/asset.helper';
import { TemplateHelper } from '../../helpers/template.helper';
import { JsReportResult } from '../../types';
import type JsReport from 'jsreport-core';
import { JsReportTemplateOptions } from '../../interfaces/template.options';
import { JsReportRenderOptions } from '../../types';
export declare class JsReportTemplateService {
    private readonly options;
    readonly instance: JsReport.Reporter;
    private assetsInitialized;
    private templateInitialized;
    constructor(options: JsReportTemplateOptions, instance: JsReport.Reporter);
    asset: AssetHelper;
    template: TemplateHelper;
    script: AssetHelper;
    get documentStore(): JsReport.DocumentStore;
    private initAssets;
    private clearAssets;
    private initialize;
    render(data?: {}, pdf?: boolean): Promise<JsReportResult>;
    getStream(data?: {}, options?: JsReportRenderOptions): Promise<JsReportResult>;
}
