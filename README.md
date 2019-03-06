## Intruções iniciais

* Para configurar o ambiente de trabalho :

1. Instale o node.js
2. Instale o mongodb

## Aplicação ( Back - End )

* Para rodar o serviço de back end juntamente com o banco de dados.

1. Abra o prompt de comando
2. Baixe as depencias do projeto executando "cd C:\Users\NOME_DO_USUARIO_DO_COMPUTADOR\CAMINHO_DOS_ARQUIVOS_BAIXADOS\back-end && npm install && npm install nodemon -g"
3. Abra outra instancia do prompt de comando
4. Execute o banco de dados. Inicialmente o mongodb terá um banco de dados configurado na sua pasta ProgramFiles. Contudo comitei o banco de dados caso deseje usar alguma informações pré-prontas.
5. Para executar o banco de dados comitado no prompt de comando entre na pasta do mongodb com o comando
'cd C:\Program Files\MongoDB\Server\4.0\bin && mongod.exe --dbpath="C:\Users\NOMEDOUSUÁRIO\CAMINHO_DOS_ARQUIVOS_BAIXADOS\db"'
6. Abra dois prompts de comando
7. No primeiro execute "cd C:\Users\NOME_DO_USUARIO_DO_COMPUTADOR\CAMINHO_DOS_ARQUIVOS_BAIXADOS\back-end && npm start". Isso serve para iniciar o servidor back-end
8. Na segunda execute "cd C:\Users\NOME_DO_USUARIO_DO_COMPUTADOR\CAMINHO_DOS_ARQUIVOS_BAIXADOS\back-end && npm run compileAlways". Isso serve para compilar o servidor novamente ao executar qualquer mudança no código fonte.

* A aplicação do tentacullus é executada com o node.js, e está pre-configurada para rodar localmente na porta 300, ou seja http://localhost:300.

* Utilizamos o mongodb como banco de dados, e para realizar a conexão com o banco de dados e definir os pontos de chamadas utilizamos o mongoose.

* A api também utiliza o Socket.io para definir websockets e avisar sempre que houver alguma mudança em algum schema da aplicação.

## Desenvolvido da aplicação

* Todos os end-points comuns foram implementados (post,get,put,patch e delete)
* Não foi totalmente implementado o delete de todos os schemas, devido aos relacionamentos entre os mesmos(Checar o schema e relacionamentos entre etapa, processo e job para entender melhor).

* Ainda é preciso criptografar as senhas de cada conta(Recomendo o uso do bcrypt).

* Schemas desenvolvidos :
1. Campanha
2. Cliente
3. Conta
4. Etapa
5. Processo
6. Job
7. Status (São os status de jobs, para trabalhar com o khaban)

* Schemas em falta :
1. Subtarefas dos jobs
2. Timesheet
3. Arquivos
4. Relatórios
5. Toda a Parte Financeira
6. Interações (Comentários dos jobs)

* Ainda é preciso desenvolver os perfis de usuário e definir os bloqueios de end-points


## Serviço ( Front - End )
* Para rodar o serviço 
1. Abra o prompt de comando
2. Instale as depêndencias, para isso execute "C:\Users\NOME_DO_USUARIO_DO_COMPUTADOR\CAMINHO_DOS_ARQUIVOS_BAIXADOS\back-end && npm install"
3. execute o projeto com "C:\Users\NOME_DO_USUARIO_DO_COMPUTADOR\CAMINHO_DOS_ARQUIVOS_BAIXADOS\back-end && ng serve"

## Desenvolvimento do Serviço
* O projeto do serviço foi desenvolvido com o o angular 6. Existem várias dependencias rodando com versões anteriores, mas sem apresentar nenhum erro.

* O projeto é uma adaptação de um tema chamado Ng2Angle. O mesmo está disponível em várias plataformas / frameworks (Angular, Angular Material , React , Vue Js , Ruby, etc)

* Já Desenvolvido
1. Configurações > Etapas
2. Configurações > Status
3. Configurações > Processos (Apenas a parte de criar / editar um processo, falta a listagem de todos.)
4. Searchbar (Emitindo eventos quando a busca for realizada.)

* Falta Desenvolver
1. Jobs
2. Clientes
3. Funcionários
4. Campanhas
5. Perfis de usuário
6. Página de login
7. Realizar filtro nas listagens de cada parte das configurações ao receber evento do searchbar
