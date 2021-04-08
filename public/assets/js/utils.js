export function appendToTemplate(element, tagName, html) 
{
    const wrappElement = document.createElement(tagName);

    wrappElement.innerHTML = html;

    element.append(wrappElement);

    return wrappElement;
}

export function getQueryString() 
{
    const queryString = {};

    if (window.location.search) {

        window.location.search.split('?')[1].split('&').forEach(param => {
            
            param = param.split('=');

            queryString[param[0]] = decodeURIComponent(param[1]);
        });
    }

    return queryString;
}

export function getFormValues(form)
{
    const values = {};

    form.querySelectorAll('[name]').forEach(field => {
        switch (field.type) {
            case 'select':
                values[field.name] = field.querySelector('option:selected')?.value;
                break;

            case 'radio':
                values[field.name] = form.querySelector(`[name=${field.name}]:checked`)?.value;
                break;

            case 'checkbox':
                values[field.name] = [];

                form.querySelectorAll(`[name=${field.name}]:checked`).forEach(checkbox => {
                    values[field.name].push(checkbox.value);
                });
                break;

            default:
                values[field.name] = field.value;
        }
    });

    return values;
}

export function resetFormValues(form) 
{ 
    const inputs = form.getElementsByTagName('input');
    const selects = form.getElementsByTagName('select');
    const textareas = form.getElementsByTagName('textarea');

    [...inputs].forEach(input => {
        switch (input.type) {   
            case 'radio':
            case 'checkbox':
                input.checked = false;  
                
            default:
                input.value = '';
        }
    });

    [...selects].forEach(select => select.selectedIndex = 0);

    [...textareas].forEach(textarea =>  textarea.value = '');
}


export function getLoaderHTML(color = 'blue-1', isButton = true)
{
    const classes = [
        color,
        isButton ? 'is-button' : ''
    ];

    return `
        <div class="lds-ring ${classes.join(' ')}" id="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    `;
}

export function showAlert(type, message) 
{
    let alertWrapper = document.querySelector('#alert-wrapper');

    if (!alertWrapper) {
        alertWrapper = document.createElement('div');

        alertWrapper.id = 'alert-wrapper';

        document.body.append(alertWrapper);
    }

    const alertEl = document.createElement('div');

    alertWrapper.append(alertEl);

    alertEl.innerHTML = `<span>${message}</span><span class="btn-close">&times;</span>`;

    alertEl.classList.add('alert', type);
    
    const closeAlert = () => {
        alertEl.classList.remove('show');

        setTimeout(() => alertEl.remove(), 1000);
    }

    alertEl.querySelector('.btn-close').addEventListener('click', e => closeAlert());

    setTimeout(() => alertEl.classList.add('show'), 100); 

    setTimeout(() => closeAlert(), 8000);
}

export function translateMessage(messageType) {

    switch (messageType) {
        case 'auth/invalid-email':
            return 'E-mail inválido.';
        
        case 'auth/weak-password':
            return 'A senha deve conter 6 ou mais caracteres.';

        case 'auth/email-already-in-use':
            return 'E-mail informado já cadastrado.';

        case 'auth/wrong-password':
            return 'E-mail ou senha incorretos.';

        case 'auth/user-not-found':
            return 'Usuário não encontrado.';

        default: 
            return 'Erro ao realizar a operação. Verifique as informações e tente novamente.';
    }
}

export function formatCurrency(value) 
{
    return Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}