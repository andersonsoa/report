import { Provider } from '@nestjs/common';
import { JSREPORT_INSTANCE_TOKEN } from '../../constants';
import type JsReport from 'jsreport-core';
import {
  getComponentToken,
  getComponentOptionsToken,
} from '../../helpers/token.helper';

import { JsReportComponentService } from './service';
import { JsReportTemplateOptions } from 'src/lib/interfaces/template.options';

const useFactory = async (
  options: JsReportTemplateOptions,
  instance: JsReport.Reporter,
) => {
  return new JsReportComponentService(options, instance);
};

export const getComponentProvider = (
  options: JsReportTemplateOptions,
): Provider => {
  return {
    provide: getComponentToken(options.name),
    useFactory,
    inject: [getComponentOptionsToken(options.name), JSREPORT_INSTANCE_TOKEN],
  };
};
