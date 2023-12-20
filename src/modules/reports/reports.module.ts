import { Module } from '@nestjs/common';
import { templates } from './templates';
import { ReportsController } from './reports.controller';
import { JsReportModule } from 'src/lib';
import { components } from 'src/modules/reports/components';

@Module({
  imports: [
    ...components.map((opts) => JsReportModule.registerComponent(opts as any)),
    ...templates.map((opts) => JsReportModule.registerTemplate(opts as any)),
  ],
  controllers: [ReportsController],
})
export class ReportsModule {}
