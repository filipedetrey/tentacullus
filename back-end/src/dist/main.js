"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const funcionario_controller_1 = require("./controllers/funcionario.controller");
const cliente_controller_1 = require("./controllers/cliente.controller");
const campanha_controller_1 = require("./controllers/campanha.controller");
const processo_controller_1 = require("./controllers/processo.controller");
const etapa_controller_1 = require("./controllers/etapa.controller");
const status_controller_1 = require("./controllers/status.controller");
const job_controller_1 = require("./controllers/job.controller");
const conta_controller_1 = require("./controllers/conta.controller");
const server = new server_1.Server();
server.bootstrap([
    funcionario_controller_1.funcionarioController,
    cliente_controller_1.clienteController,
    campanha_controller_1.campanhaController,
    processo_controller_1.processoController,
    etapa_controller_1.etapaController,
    status_controller_1.statusController,
    job_controller_1.jobController,
    conta_controller_1.contaController
]).then(server => {
    console.log('Servidor rodando na porta ' + server.application.address().port);
}).catch(error => {
    console.log("Erro ao inicializar servidor");
    console.log(error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map