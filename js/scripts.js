/*"use strict";
document.getElementById("formulario-plano").addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
    }
    else {
      event.preventDefault();
       gerarPlanoCorte();
    }
    form.classList.add('was-validated');
}, false);

*/
/*"use strict";
(() => {
    'use strict';
    // Buscar todos os formulários que queremos aplicar estilos de validação do Bootstrap
    const forms = document.querySelectorAll('.needs-validation');
    // Iterar sobre eles e prevenir o envio se houver algum erro de validação
    Array.from(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }else {
                obtervaloresFormulario();

            }
            form.classList.add('was-validated');
          
        }, false);
    });
})();

*/

// Recupera os valores preenchidos no formulario web e retorna um objeto FormData
function obtervaloresFormulario() {
  const formulario = document.getElementById('formulario-plano');
  const formData = new FormData(formulario); // Cria um objeto FormData com base no formulário

  // Converte o FormData em um objeto e em seguida transforma em JSON
  const formDataObj = Object.fromEntries(formData.entries());
  const json = JSON.stringify(formDataObj);

  const radiosTipoMovel = document.getElementsByName('tipo-movel');

  // Itera pelos elementos e verifica qual está marcado
  let tipoMovelSelecionado;
  for (const radio of radiosTipoMovel) {
    if (radio.checked) {
      tipoMovelSelecionado = radio.value;
      break;
    }
  }

  const jsonAPI = JSON.stringify({

    altura: Number(formData.get('altura')),
    largura: Number(formData.get('largura')),
    profundidade: Number(formData.get('profundidade')),
    tipo: Number(tipoMovelSelecionado),
    quantidadePrateleiras: Number(formData.get('prateleiras')),
    quantidadeDivisoesInternas: Number(formData.get('divisoes')),
    possuiAcabamentoInferior: (formData.get('acabamento-inferior') !== null),
    possuiAcabamentoSuperior: (formData.get('acabamento-inferior') !== null),
    quantidadePortas: Number(formData.get('portas')),
    quantidadeGavetas: Number(formData.get('gavetas')),
    proporcaoPorta: Number(formData.get('proporcao-porta')),
    proporcaoGaveta: Number(formData.get('proporcao-gaveta')),
    estilo: 1

  });

  return jsonAPI;
}

function gerarPlanoCorte() {
  const formulario = obtervaloresFormulario();
  enviarRequisicaoAPI(formulario);
}


// Funcao que acessa a API externa para obter o plano de corte.
async function enviarRequisicaoAPI(formulario) {

  try {
    // Faz a chamada à API usando `fetch`
    const response = await fetch('https://localhost:7001/api/Armario/CalcularPlanoArmario', {
      method: 'POST', // ou 'POST', 'PUT', etc., conforme necessário
      headers: { 'Content-Type': 'application/json' },

      body: formulario

    });

    // Se o status for 200-299 (sucesso), transforma o resultado em JSON
    if (response.status === 200) {
      const data = await response.json(); // Converte a resposta em JSON

      apresentarPlanoCorte(data);

      console.log('Dados recebidos:', data);
    } else if (response.status === 400) {
      // Tratamento específico para erro 400 - Bad Request
      const errorData = await response.json(); // Captura a mensagem de erro no corpo da resposta       

      apresentarErro(errorData, 1);

    } else {

      const errorData = await response.json();

      apresentarErro(errorData, 2);
      // Tratamento genérico para outros status (404, 500, etc.)
      console.error(`Erro: ${response.status} - ${response.statusText}`);

    }
  } catch (error) {
    apresentarErro(error, 2);

    // Tratamento de erros de conexão ou exceções imprevistas
    console.error('Erro ao gerar plano de corte: ', error.message);

  }

}

// Apresenta na tela o plano de corte com base no resultado obtido da API.
function apresentarPlanoCorte(planoCorte) {
  let resultado = document.getElementById("plano-corte");

  for (let grupo in planoCorte) {

    resultado.innerHTML += "<h2>" + grupo + "</h2>";

    for (let atributo in planoCorte[grupo]) {
      resultado.innerHTML += "<h5>" + atributo + ":     " + planoCorte[grupo][atributo] + "</h5>";
    }
  }

}

// Apresenta uma mensagem de erro formatada em caso de erro na chamada a API.
// Erro pode ser do tipo 1 caso seja recuperada da API ou 2 para demais erros
function apresentarErro(erroRequisicao, tipoErro) {
  let erroTela = document.getElementById("mensagens-erro");
  erroTela.classList.add("alert", "alert-danger");


  if (tipoErro == 1) {
    for (let erroCompleto in erroRequisicao.errors) {

      erroTela.innerHTML += "<h2> Erro </h2>";

      for (let erroDetalhado in erroRequisicao.errors[erroCompleto]) {

        erroTela.innerHTML += "<h5>" + erroRequisicao.errors[erroCompleto][erroDetalhado] + "</h5>";

      }

    }
  } else {
    erroTela.innerHTML += "<h2> Erro  ao gerar o plano de corte </h2>";
  }
}