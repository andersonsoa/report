import {
  Body,
  Controller,
  Header,
  HttpCode,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectJsrTemplate, JsReportTemplateService } from 'src/lib';

@Controller('reports')
export class ReportsController {
  constructor(
    @InjectJsrTemplate('consolidado')
    readonly consolidadoService: JsReportTemplateService,
    @InjectJsrTemplate('bens-achados')
    readonly bensAchadosService: JsReportTemplateService,
    @InjectJsrTemplate('sintetico')
    readonly sinteticoService: JsReportTemplateService,
    @InjectJsrTemplate('bens-serviveis')
    readonly bensServiveisService: JsReportTemplateService,
    @InjectJsrTemplate('bens-inserviveis')
    readonly bensInserviveisService: JsReportTemplateService,
    @InjectJsrTemplate('contas-contabeis')
    readonly contasContabeisService: JsReportTemplateService,
    @InjectJsrTemplate('bens-nao-localizados')
    readonly bensNaoLocalizadosService: JsReportTemplateService,
    @InjectJsrTemplate('acervo-fotografico')
    readonly acervoFotograficoService: JsReportTemplateService,
  ) {}

  @Post('consolidado')
  @HttpCode(200)
  async consolidado(
    @Res({ passthrough: true }) res: Response,
    @Body() data: any,
  ) {
    res.set({
      'Content-Type': 'application/pdf; charset=utf-8',
    });

    const result = await this.consolidadoService.getStream({
      titulo: 'Relatório Consolidado Final',
      ...data,
    });

    return new StreamableFile(result.content);
  }

  @Post('bens-achados')
  @HttpCode(200)
  async bensAchados(
    @Res({ passthrough: true }) res: Response,
    @Body() data: any,
  ) {
    res.set({
      'Content-Type': 'application/pdf; charset=utf-8',
    });

    const result = await this.bensAchadosService.getStream({
      titulo: 'Relatório de Bens Achados',
      ...data,
    });

    return new StreamableFile(result.content);
  }

  @Post('sintetico')
  @HttpCode(200)
  async sintetico(
    @Res({ passthrough: true }) res: Response,
    @Body() data: any,
  ) {
    res.set({
      'Content-Type': 'application/pdf; charset=utf-8',
    });

    const result = await this.sinteticoService.getStream({
      titulo: 'Relatório Sintético',
      ...data,
    });

    return new StreamableFile(result.content);
  }

  @Post('bens-serviveis')
  @HttpCode(200)
  async bensServiveis(
    @Res({ passthrough: true }) res: Response,
    @Body() data: any,
  ) {
    res.set({
      'Content-Type': 'application/pdf; charset=utf-8',
    });

    const result = await this.bensServiveisService.getStream({
      titulo: 'Relatório de Bens Servíveis',
      ...data,
    });

    return new StreamableFile(result.content);
  }

  @Post('bens-inserviveis')
  @HttpCode(200)
  async bensInserviveis(
    @Res({ passthrough: true }) res: Response,
    @Body() data: any,
  ) {
    res.set({
      'Content-Type': 'application/pdf; charset=utf-8',
    });

    const result = await this.bensInserviveisService.getStream({
      titulo: 'Relatório de Bens Inservíveis',
      ...data,
    });

    return new StreamableFile(result.content);
  }

  @Post('contas-contabeis')
  @HttpCode(200)
  @Header('content-type', 'application/pdf; charset=utf-8')
  async contasContabeis(
    @Res({ passthrough: true }) res: Response,
    @Body() data: any,
  ) {
    const result = await this.contasContabeisService.getStream({
      titulo: 'Relatório de Contas Contábeis',
      ...data,
    });

    return new StreamableFile(result.content);
  }

  @Post('bens-nao-localizados')
  @HttpCode(200)
  @Header('content-type', 'application/pdf; charset=utf-8')
  async bensNaoLocalizados(
    @Res({ passthrough: true }) res: Response,
    @Body() data: any,
  ) {
    const result = await this.bensNaoLocalizadosService.getStream({
      titulo: 'Relatório de Bens Não Localizados',
      ...data,
    });

    return new StreamableFile(result.content);
  }

  @Post('acervo-fotografico')
  @HttpCode(200)
  async acervoFotografico(
    @Res({ passthrough: true }) res: Response,
    @Body() data: any,
  ) {
    res.set({
      'Content-Type': 'application/pdf; charset=utf-8',
    });

    const result = await this.acervoFotograficoService.getStream({
      titulo: 'Relatório de Acervo Fotográfico',
      ...data,
    });
    return new StreamableFile(result.content);
  }
}
