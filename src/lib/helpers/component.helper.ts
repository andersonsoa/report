import { Reporter } from 'jsreport-core';

import { JsReportComponent } from '../types';

export class ComponentHelper {
  private readonly jsReport: Reporter;

  constructor(jsReport: Reporter) {
    this.jsReport = jsReport;
  }

  async stored(name: string) {
    const result = await this.jsReport.documentStore
      .collection('components')
      .find({ name });

    return result.length > 0;
  }

  async insertFn(name: string, templateFn: () => Promise<JsReportComponent>) {
    const isStored = await this.stored(name);
    if (!isStored) {
      await this.insert(await templateFn());
    }
  }

  async insert(template: JsReportComponent) {
    const isStored = await this.stored(template.name);

    if (!isStored) {
      await this.jsReport.documentStore
        .collection('components')
        .insert(template);
    }
  }

  async upsert(template: JsReportComponent) {
    const isStored = await this.stored(template.name);

    if (!isStored) {
      await this.insert(template);
    } else {
      await this.jsReport.documentStore
        .collection('components')
        .update({ name: template.name }, { $set: template });
    }
  }

  async remove(name: string) {
    const isStored = await this.stored(name);

    if (isStored) {
      await this.jsReport.documentStore
        .collection('components')
        .remove({ name });
    }
  }

  async find(name: string) {
    const isStored = await this.stored(name);

    if (isStored) {
      const found = await this.jsReport.documentStore
        .collection('components')
        .find({ name });

      return found[found.length - 1] as JsReportComponent;
    }
  }
}
