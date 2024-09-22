"use strict";
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
            }
            form.classList.add('was-validated');
        }, false);
    });
})();
