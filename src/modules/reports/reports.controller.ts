import {
  Body,
  Controller,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Res,
  StreamableFile,
} from "@nestjs/common";
import { Response } from "express";
import { InjectJsrTemplate, JsReportTemplateService } from "src/lib";

@Controller("reports")
export class ReportsController {
  constructor(
    @InjectJsrTemplate("teste")
    readonly reportService: JsReportTemplateService,
  ) {}

  @Post("")
  @HttpCode(200)
  async report(
    @Res({ passthrough: true }) res: Response,
    @Body() data: any,
    @Query() params: any,
  ) {
    res.set({
      "Content-Type": "application/pdf; charset=utf-8",
    });

    const result = await this.reportService.getStream({ name: params.name });

    return new StreamableFile(result.content);
  }
}
