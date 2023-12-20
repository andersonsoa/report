/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AssetHelper } from '../../helpers/asset.helper';
import { TemplateHelper } from '../../helpers/template.helper';
import { JsReportResult } from '../../types';
import path from 'path';
import cloneDeep from 'lodash.clonedeep';
import fs from 'fs';
import type JsReport from 'jsreport-core';
import { JsReportTemplateOptions } from '../../interfaces/template.options';
import { ComponentHelper } from 'src/lib/helpers/component.helper';

export class JsReportComponentService {
  private assetsInitialized = false;
  private templateInitialized = false;

  constructor(
    private readonly options: JsReportTemplateOptions,
    readonly instance: JsReport.Reporter,
  ) {
    this.template = new ComponentHelper(instance);
    this.script = new AssetHelper(instance, 'scripts');

    if (options.initialize === true) {
      setTimeout(async () => {
        await this.initialize();
      });
    }
  }

  asset: AssetHelper;
  template: ComponentHelper;
  script: AssetHelper;

  get documentStore() {
    return this.instance.documentStore;
  }

  private async initAssets() {
    if (this.assetsInitialized) {
      return;
    }

    if (this.options.scripts?.length > 0) {
      await this.script.insertAll(
        this.options.scripts.map((script) => {
          if (script.path.slice(0, 1) !== '/') {
            return {
              ...script,
              path: path.join(this.options.folder, script.path),
              encoding: 'utf-8',
            };
          }
          return script;
        }),
      );
    }

    this.assetsInitialized = true;
  }

  private async clearAssets() {
    if (this.options.scripts?.length > 0) {
      for (const script of this.options.scripts) {
        await this.script.remove(script.name);
      }
    }

    this.assetsInitialized = false;
  }

  private async initialize() {
    // await this.initAssets();

    if (this.templateInitialized) {
      return;
    }

    const template = cloneDeep(this.options.template);

    if (!template.name) {
      template.name = this.options.name;
    }

    if (template.recipe === 'xlsx') {
      if (!template.content) {
        template.content = '{{{xlsxPrint}}}';
      }

      if (typeof (template as any).xlsx?.templateAsset?.content === 'string') {
        if (
          (template as any).xlsx?.templateAsset?.content?.slice(-5) === '.xlsx'
        ) {
          (template as any).xlsx.templateAsset.content = fs.readFileSync(
            path.join(
              this.options.folder,
              (template as any).xlsx.templateAsset.content,
            ),
            'base64',
          );
          (template as any).xlsx.templateAsset.encoding = 'base64';
        }
      }
    }

    if (template.recipe === 'docx') {
      template.content = '';
      if (typeof template.docx?.templateAsset?.content === 'string') {
        if (template.docx.templateAsset.content.slice(-5) === '.docx') {
          template.docx.templateAsset.content = fs.readFileSync(
            path.join(this.options.folder, template.docx.templateAsset.content),
            'base64',
          );

          template.docx.templateAsset.encoding = 'base64';
        }
      }
    }

    if (template.recipe === 'html-to-xlsx') {
      if (
        typeof (template as any).htmlToXlsx?.templateAssetShortid === 'string'
      ) {
        (template as any).htmlToXlsx.templateAssetShortid =
          await this.asset.shortId(
            (template as any).htmlToXlsx.templateAssetShortid,
          );
      }
    }

    if (
      ['chrome-pdf', 'html-to-xlsx'].includes(template.recipe) &&
      (template.content.slice(-5) === '.html' ||
        template.content.slice(-4) === '.htm' ||
        template.content.slice(-4) === '.hbs')
    ) {
      template.content = fs.readFileSync(
        path.join(this.options.folder, template.content),
        'utf-8',
      );
    }

    if (!!template.helpers) {
      template.helpers = fs.readFileSync(
        path.join(this.options.folder, template.helpers as any),
        'utf-8',
      );
    }

    await this.template.insert(template);

    console.log(this.options.name, 'component initialized');

    this.templateInitialized = true;
  }
}
