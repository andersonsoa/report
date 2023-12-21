/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AssetHelper } from "../../helpers/asset.helper";
import { TemplateHelper } from "../../helpers/template.helper";
import { JsReportResult } from "../../types";
import path from "path";
import cloneDeep from "lodash.clonedeep";
import fs from "fs";
import type JsReport from "jsreport-core";
import { JsReportTemplateOptions } from "../../interfaces/template.options";
import { JsReportRenderOptions } from "../../types";
import { Logger } from "@nestjs/common";

export class JsReportTemplateService {
  private readonly logger = new Logger(JsReportTemplateService.name);
  private assetsInitializeds = new Map<string, boolean>();
  private templateInitializeds = new Map<string, boolean>();

  constructor(
    private readonly options:
      | JsReportTemplateOptions
      | JsReportTemplateOptions[],
    readonly instance: JsReport.Reporter,
  ) {
    this.asset = new AssetHelper(instance);
    this.template = new TemplateHelper(instance);
    this.script = new AssetHelper(instance, "scripts");

    setTimeout(async () => this.init(options));
  }

  asset: AssetHelper;
  template: TemplateHelper;
  script: AssetHelper;

  get documentStore() {
    return this.instance.documentStore;
  }

  private async init(
    options: JsReportTemplateOptions | JsReportTemplateOptions[],
  ) {
    if (Array.isArray(options)) {
      for (const opt of options) {
        if (opt.initialize === true) {
          await this.initialize(opt);
        }
      }
    } else {
      if (options.initialize === true) {
        await this.initialize(options);
      }
    }
  }

  private async initAssets(options: JsReportTemplateOptions) {
    if (
      this.assetsInitializeds.has(options.name) &&
      this.assetsInitializeds.get(options.name) === true
    ) {
      return;
    }

    if (options.assets?.length > 0) {
      await this.asset.insertAll(
        options.assets.map((asset) => {
          if (asset.path.slice(0, 1) !== "/") {
            return {
              ...asset,
              path: path.join(options.folder, asset.path),
            };
          }
          return asset;
        }),
      );
    }

    if (options.scripts?.length > 0) {
      await this.script.insertAll(
        options.scripts.map((script) => {
          if (script.path.slice(0, 1) !== "/") {
            return {
              ...script,
              path: path.join(options.folder, script.path),
              encoding: "utf-8",
            };
          }
          return script;
        }),
      );
    }

    this.assetsInitializeds.set(options.name, true);
  }

  private async clearAssets(options: JsReportTemplateOptions) {
    if (options.assets?.length > 0) {
      for (const asset of options.assets) {
        await this.asset.remove(asset.name);
      }
    }

    if (options.scripts?.length > 0) {
      for (const script of options.scripts) {
        await this.script.remove(script.name);
      }
    }

    this.assetsInitializeds.set(options.name, false);
  }

  private async initialize(options: JsReportTemplateOptions) {
    await this.initAssets(options);

    if (
      this.templateInitializeds.has(options.name) &&
      this.templateInitializeds.get(options.name) === true
    ) {
      return;
    }

    const template = cloneDeep(options.template);

    if (!template.name) {
      template.name = options.name;
    }

    if (template.recipe === "xlsx") {
      if (!template.content) {
        template.content = "{{{xlsxPrint}}}";
      }

      if (typeof (template as any).xlsx?.templateAsset?.content === "string") {
        if (
          (template as any).xlsx?.templateAsset?.content?.slice(-5) === ".xlsx"
        ) {
          (template as any).xlsx.templateAsset.content = fs.readFileSync(
            path.join(
              options.folder,
              (template as any).xlsx.templateAsset.content,
            ),
            "base64",
          );
          (template as any).xlsx.templateAsset.encoding = "base64";
        }
      }
    }

    if (template.recipe === "docx") {
      template.content = "";
      if (typeof template.docx?.templateAsset?.content === "string") {
        if (template.docx.templateAsset.content.slice(-5) === ".docx") {
          template.docx.templateAsset.content = fs.readFileSync(
            path.join(options.folder, template.docx.templateAsset.content),
            "base64",
          );

          template.docx.templateAsset.encoding = "base64";
        }
      }
    }

    if (template.recipe === "html-to-xlsx") {
      if (
        typeof (template as any).htmlToXlsx?.templateAssetShortid === "string"
      ) {
        (template as any).htmlToXlsx.templateAssetShortid =
          await this.asset.shortId(
            (template as any).htmlToXlsx.templateAssetShortid,
          );
      }
    }

    if (
      ["chrome-pdf", "html-to-xlsx"].includes(template.recipe) &&
      (template.content.slice(-5) === ".html" ||
        template.content.slice(-4) === ".htm" ||
        template.content.slice(-4) === ".hbs")
    ) {
      template.content = fs.readFileSync(
        path.join(options.folder, template.content),
        "utf-8",
      );
    }

    if (!!template.helpers) {
      template.helpers = fs.readFileSync(
        path.join(options.folder, template.helpers as any),
        "utf-8",
      );
    }

    await this.template.insert(template);

    this.logger.log(`Template ::${options.name}:: has initialized`);

    this.templateInitializeds.set(options.name, true);
  }

  async render(templateName: string, data = {}, pdf = false) {
    await this.init(this.options);

    const option = Array.isArray(this.options)
      ? this.options.find((opt) => opt.name === templateName)
      : this.options;

    const renderOpts = {
      options: { reportName: option.name },
      template: {
        name: option.name,
        engine: option.template.engine,
        recipe: option.template.recipe,
        unoconv: undefined,
      },
      data,
    };

    if (pdf) {
      renderOpts.template.unoconv = {
        format: "pdf",
        enabled: true,
      };
    }
    // @ts-ignore comment
    const result = await this.instance.render(renderOpts);

    setTimeout(async () => {
      await this.clearAssets(option);
    });

    return result as JsReportResult;
  }

  async getStream(
    templateName: string,
    data = {},
    options: JsReportRenderOptions = { pdf: false },
  ) {
    const { pdf } = options;

    const result = await this.render(templateName, data, pdf);

    return result;
  }
}
