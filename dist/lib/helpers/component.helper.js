"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentHelper = void 0;
class ComponentHelper {
    constructor(jsReport) {
        this.jsReport = jsReport;
    }
    async stored(name) {
        const result = await this.jsReport.documentStore
            .collection('components')
            .find({ name });
        return result.length > 0;
    }
    async insertFn(name, templateFn) {
        const isStored = await this.stored(name);
        if (!isStored) {
            await this.insert(await templateFn());
        }
    }
    async insert(template) {
        const isStored = await this.stored(template.name);
        if (!isStored) {
            await this.jsReport.documentStore
                .collection('components')
                .insert(template);
        }
    }
    async upsert(template) {
        const isStored = await this.stored(template.name);
        if (!isStored) {
            await this.insert(template);
        }
        else {
            await this.jsReport.documentStore
                .collection('components')
                .update({ name: template.name }, { $set: template });
        }
    }
    async remove(name) {
        const isStored = await this.stored(name);
        if (isStored) {
            await this.jsReport.documentStore
                .collection('components')
                .remove({ name });
        }
    }
    async find(name) {
        const isStored = await this.stored(name);
        if (isStored) {
            const found = await this.jsReport.documentStore
                .collection('components')
                .find({ name });
            return found[found.length - 1];
        }
    }
}
exports.ComponentHelper = ComponentHelper;
//# sourceMappingURL=component.helper.js.map