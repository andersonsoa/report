/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TemplateRegistry, TemplateLike, Response } from 'jsreport-core';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type JsReportComponent = {
  name: string;
  engine: string;
  content: string;
};

export type JsReportTemplate = DeepPartial<
  TemplateLike &
    // @ts-ignore comment
    TemplateRegistry['NamedTemplate'] &
    // @ts-ignore comment
    TemplateRegistry['ScriptsTemplate'] &
    // @ts-ignore comment
    TemplateRegistry['DocxTemplateModifier'] &
    // @ts-ignore comment
    TemplateRegistry['Html2XlsxTemplate'] &
    // @ts-ignore comment
    TemplateRegistry['XlsxTemplate'] & { xlsx: any }
>;

export type Asset = {
  name: string;
  path?: string;
  content?: any;
  encoding?: string;
  scope?: 'global' | 'template';
};

export type JsReportResult = Response & {
  meta: {
    reportName: string;
    fileExtension: string;
    contentType: string;
    officeDocumentType: string;
    logs: any[];
    profileId: string;
  };
};

export type JsReportRenderOptions = {
  pdf?: boolean;
  fileName?: string;
};
