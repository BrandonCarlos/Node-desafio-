const express = require('express');//Importando o "EXPRESS"
//const express é um FUNCTION

//Vamos iniciar a aplicação
const server = express();//
//------Precisamos dizer pro EXPRESS que vamos utilizar JSON, precisamos dizer pro EXPRESS ler JSON ---
//A linha abaixo é para dizer pro EXPRESS LER JSON NO CORPO DA REQUISIÇÃO
server.use(express.json());//não esquecer de por json(), pois é uma FUNÇÃO
//"use", PEDINDO PRA PASSAR UM PLUGIN, UM MÓDULO

//CRUD - CREATE, READ, UPDATE, DELETE

//Query Params = ?teste=1
//Route Params = /users/1
//Request body = {"name": "Brandon", "email": "Brandon@gmail.com}

//DESAFIO

/**
 * A variável `projects` pode ser `const` porque um `array`
 * pode receber adições ou exclusões mesmo sendo uma constante.
 */
const ArrayDeprojetos = [];

/**
 * Middleware LOCAL que checa se o projeto existe
 */
function ChecandoSeOProjetoExiste(req, res, next) {
  const { id } = req.params;//Aki está pegando o Número(ID) do ROUTE PARAMS
  const projeto = ArrayDeprojetos.find(projetin => projetin.id == id);//FIND: PROCURANDO
  //ARRAY PROCURANDO ELEMENTO DE ACORDO COM INDICE QUE ESTÁ NO "ROUTE PARAMS"
  //const projeto recebe ARRAY procurando o indice informado no ROUTE PARAMS
  //ex: No ROUTE PARAMS: (INDICE 4) = no array = (indice 4 = "Brandon")
  //e guarda o elemento (indice 4 = "Brandon") na const projeto

  if (!projeto) {//SE no ROUTE PARAMS tiver um indice que não tem no ARRAY então exibirá 
    //o erro abaixo:
    return res.status(400).json({ erro: 'Projeto não encontrado' });
  }

  return next();
}

/**
 * Middleware que dá log no número de requisições
 */
function NumeroDeRequisicoes(req, res, next) {

  console.count("Número de requisições");

  return next();
}

server.use(NumeroDeRequisicoes);

/**
 * Retorna todos os projetos
 */
server.get('/projetos', (req, res) => {
  return res.json(ArrayDeprojetos);
});

/**
 * Request body: id, title
 * Cadastra um novo projeto
 */
server.post('/projetos', (req, res) => {
  const { id, titulo } = req.body;

  const projeto = {
    id,
    titulo,
    tarefas: []
  };

  ArrayDeprojetos.push(projeto);

  return res.json(projeto);
});

/**
 * Route params: id
 * Request body: title
 * Altera o título do projeto com o id presente nos parâmetros da rota.
 */
server.put('/projetos/:id', ChecandoSeOProjetoExiste, (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;

  const projeto = ArrayDeprojetos.find(p => p.id == id);

  projeto.titulo = titulo;

  return res.json(projeto);
});

/**
 * Route params: id
 * Deleta o projeto associado ao id presente nos parâmetros da rota.
 */
server.delete('/projetos/:id', ChecandoSeOProjetoExiste, (req, res) => {
  const { id } = req.params;

  const IndexDoProjeto = ArrayDeprojetos.findIndex(projetin => projetin.id == id);

  ArrayDeprojetos.splice(IndexDoProjeto, 1);

  return res.send();
});

/**
 * Route params: id;
 * Adiciona uma nova tarefa no projeto escolhido via id; 
 */
server.post('/projetos/:id/tarefas', ChecandoSeOProjetoExiste, (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;

  const projeto = projetos.find(p => p.id == id);

  projeto.tarefas.push(titulo);

  return res.json(projeto);
});

server.listen(3000);//Escolhi a PORTA 3000, ou seja localhost:3000