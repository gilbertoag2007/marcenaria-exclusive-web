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

        gerarPlanoCorte(formValues);

        return formValues;  
}


function gerarPlanoCorte(formulario){
// Exemplo de POST request
fetch('https://localhost:7001/api/Armario/CalcularPlanoArmario', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',    
    },
    body: JSON.stringify({
        
            altura: 200,
            largura: 100,
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
})
.then(response => response.json())
.then(data => {
    console.log('Sucesso:', data);
})
.catch(error => {
    console.error('Erro:', error);
});


}