"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../common/controller");
const campanha_schema_1 = require("../schemas/campanha.schema");
class CampanhaController extends controller_1.Controller {
    constructor() {
        super(campanha_schema_1.Campanha);
    }
    prepareOne(query) {
        return query.populate('cliente');
    }
    prepareAll(query) {
        return query.populate('cliente');
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
    }
}
exports.campanhaController = new CampanhaController();
//# sourceMappingURL=campanha.controller.js.map