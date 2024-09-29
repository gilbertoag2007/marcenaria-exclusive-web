/*
document.getElementById("formulario-plano").addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
    }
    else {
        obtervaloresFormulario();
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
        const formValues = {};
        // Leitura dos inputs radio (Tipo de Móvel)
        formValues.tipoMovel = formData.get('tipo-movel');
        // Leitura das dimensões
        formValues.altura = formData.get('altura');
        formValues.largura = formData.get('largura');
        formValues.profundidade = formData.get('profundidade');
        // Características internas
        formValues.prateleiras = formData.get('prateleiras');
        formValues.divisoes = formData.get('divisoes');
        // Porta e gavetas
        formValues.proporcaoPorta = formData.get('proporcao-porta');
        formValues.proporcaoGaveta = formData.get('proporcao-gaveta');
        formValues.portas = formData.get('portas');
        formValues.gavetas = formData.get('gavetas');
        // Acabamento
        formValues.acabamentoSuperior = (formData.get('acabamento-superior') !== null);
        formValues.acabamentoInferior = (formData.get('acabamento-inferior') !== null);
        // Dados opcionais
        formValues.email = formData.get('email');
        formValues.projeto = formData.get('projeto');
        // Exibir os dados coletados no console
        console.log('formulario' + formValues);
        // Você pode agora usar formValues para processar o que for necessário, como enviar via AJAX ou outra manipulação

      return formData;
}

function gerarPlanoCorte(){
  const formulario = obtervaloresFormulario();
  enviarRequisicaoAPI(formulario);
}


// Funcao que acessa a API externa para obter o plano de corte.
  async function enviarRequisicaoAPI(formulario){

    try {
        // Faz a chamada à API usando `fetch`
        const response = await fetch('https://localhost:7001/api/Armario/CalcularPlanoArmario', {
          method: 'POST', // ou 'POST', 'PUT', etc., conforme necessário
          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify({
        
            altura: 2000,
            largura: 1000,
            profundidade: 60,
            tipo: 1,
            quantidadePrateleiras: 4,
            quantidadeDivisoesInternas: 1,
            possuiAcabamentoInferior: true,
            possuiAcabamentoSuperior: true,
            quantidadePortas: 2,
            quantidadeGavetas: 2,
            proporcaoPorta: 0,
            proporcaoGaveta: 0,
            estilo: 1
          
            })

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
function apresentarPlanoCorte(planoCorte){
    let resultado = document.getElementById("plano-corte");

    for (let grupo in planoCorte) {
        
        resultado.innerHTML += "<h2>" + grupo +"</h2>";
         
        for (let atributo in planoCorte[grupo]){
            resultado.innerHTML += "<h5>" + atributo+ ":     " +  planoCorte[grupo][atributo] +"</h5>";           
         }
    }
    
}

// Apresenta uma mensagem de erro formatada em caso de erro na chamada a API.
// Erro pode ser do tipo 1 caso seja recuperada da API ou 2 para demais erros
function apresentarErro(erroRequisicao, tipoErro){
    let erroTela = document.getElementById("mensagens-erro");
    erroTela.classList.add("alert", "alert-danger");     
    
    
    if(tipoErro == 1){
    for (let erroCompleto in erroRequisicao.errors) {
  
      erroTela.innerHTML += "<h2> Erro </h2>";
       
      for (let erroDetalhado in erroRequisicao.errors[erroCompleto]){

        erroTela.innerHTML += "<h5>" + erroRequisicao.errors[erroCompleto][erroDetalhado] +"</h5>";
          
       }

      }
    } else{
      erroTela.innerHTML += "<h2> Erro  ao gerar o plano de corte </h2>";
    }
}