import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  StreamableFile,
} from "@nestjs/common";
import { Response } from "express";
import { InjectJsrTemplate, JsReportTemplateService } from "src/lib";
import { ReportDTO } from "src/modules/reports/dto/report.dto";

@Controller("reports")
export class ReportsController {
  constructor(
    @InjectJsrTemplate()
    readonly reportService: JsReportTemplateService,
  ) {}

  @Post("")
  @HttpCode(200)
  async report(
    @Res({ passthrough: true }) res: Response,
    @Body() body: ReportDTO,
  ) {
    res.set({
      "Content-Type": "application/pdf; charset=utf-8",
    });

    const result = await this.reportService.getStream(
      body.templateName,
      body.data,
    );

    return new StreamableFile(result.content);
  }
}
