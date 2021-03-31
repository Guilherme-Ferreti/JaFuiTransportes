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