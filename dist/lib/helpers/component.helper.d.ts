import { Reporter } from 'jsreport-core';
import { JsReportComponent } from '../types';
export declare class ComponentHelper {
    private readonly jsReport;
    constructor(jsReport: Reporter);
    stored(name: string): Promise<boolean>;
    insertFn(name: string, templateFn: () => Promise<JsReportComponent>): Promise<void>;
    insert(template: JsReportComponent): Promise<void>;
    upsert(template: JsReportComponent): Promise<void>;
    remove(name: string): Promise<void>;
    find(name: string): Promise<JsReportComponent>;
}
