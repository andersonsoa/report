"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Server');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT');
    await app.listen(PORT).then(() => {
        logger.log(`Server started at port: ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map