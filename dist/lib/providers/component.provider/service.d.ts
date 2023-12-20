import { AssetHelper } from '../../helpers/asset.helper';
import type JsReport from 'jsreport-core';
import { JsReportTemplateOptions } from '../../interfaces/template.options';
import { ComponentHelper } from 'src/lib/helpers/component.helper';
export declare class JsReportComponentService {
    private readonly options;
    readonly instance: JsReport.Reporter;
    private assetsInitialized;
    private templateInitialized;
    constructor(options: JsReportTemplateOptions, instance: JsReport.Reporter);
    asset: AssetHelper;
    template: ComponentHelper;
    script: AssetHelper;
    get documentStore(): JsReport.DocumentStore;
    private initAssets;
    private clearAssets;
    private initialize;
}
