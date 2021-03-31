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