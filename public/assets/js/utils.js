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

export function resetForm(form) 
{ 
    const inputs = form.getElementsByTagName('input');
    const selects = form.getElementsByTagName('select');
    const textAreas = form.getElementsByTagName('textarea');

    [...inputs].forEach(input => {
        switch (input.type) {
            case 'text':
                input.value = '';
                break;
            case 'radio':
            case 'checkbox':
                input.checked = false;   
        }
    });

    [...selects].forEach(select => select.selectedIndex = 0);

    [...textAreas].forEach(textarea => textarea.innerHTML = '');
}