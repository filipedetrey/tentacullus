import { Server } from "./server/server";
import { funcionarioController } from "./controllers/funcionario.controller";
import { clienteController } from "./controllers/cliente.controller";
import { campanhaController } from "./controllers/campanha.controller";
import { processoController } from "./controllers/processo.controller";
import { etapaController } from "./controllers/etapa.controller";
import { statusController } from "./controllers/status.controller";
import { jobController } from "./controllers/job.controller";
import { contaController } from "./controllers/conta.controller";

const server: Server = new Server();
server.bootstrap([
    funcionarioController,
    clienteController,
    campanhaController,
    processoController,
    etapaController,
    statusController,
    jobController,
    contaController
]).then(server => {
    console.log('Servidor rodando na porta ' + server.application.address().port)
}).catch(error => {
    console.log("Erro ao inicializar servidor");
    console.log(error);
    process.exit(1);
})