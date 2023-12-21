import { Provider } from "@nestjs/common";
import { JSREPORT_INSTANCE_TOKEN } from "../../constants";
import type JsReport from "jsreport-core";
import {
  getTemplateToken,
  getTemplateOptionsToken,
} from "../../helpers/token.helper";

import { JsReportTemplateService } from "./service";
import { JsReportTemplateOptions } from "src/lib/interfaces/template.options";

const useFactory = async (
  options: JsReportTemplateOptions,
  instance: JsReport.Reporter,
) => {
  return new JsReportTemplateService(options, instance);
};

export const getTemplateProvider = (
  options: JsReportTemplateOptions,
): Provider => {
  return {
    provide: getTemplateToken(options.name),
    useFactory,
    inject: [getTemplateOptionsToken(options.name), JSREPORT_INSTANCE_TOKEN],
  };
};

export const getTemplatesProvider = (
  options: JsReportTemplateOptions[],
): Provider => {
  return {
    provide: getTemplateToken(),
    useFactory,
    inject: [getTemplateOptionsToken(), JSREPORT_INSTANCE_TOKEN],
  };
};
