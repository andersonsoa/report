import { Module } from '@nestjs/common';
import Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { ReportsModule } from './modules/reports/reports.module';
import { JsReportModule, JsReportTemplateService } from 'src/lib';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
    }),
    JsReportModule.forRoot({
      engines: ['handlebars'],
      recipes: ['chrome-pdf'],
      extensions: ['unoconv', 'pdf-utils'],
    }),
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
