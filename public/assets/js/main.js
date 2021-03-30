const header = document.querySelector('#header');
const footer = document.querySelector('#footer');

if (header) {
    header.querySelector('#btn-open').addEventListener('click', e => {
        header.classList.toggle('menu-open');
    });
    
    header.querySelector('#btn-close').addEventListener('click', e => {
        header.classList.toggle('menu-open');
    });
}

if (footer) {
    footer.querySelector('#rights-reserved').innerHTML = `© ${new Date().getFullYear()} Todos os direitos reservados.`;
}