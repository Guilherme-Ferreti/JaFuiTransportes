const header = document.querySelector('#header');

if (header) {
    const btnOpen = document.getElementById("btn-open");
    const btnClose = document.getElementById("btn-close");

    btnOpen.addEventListener('click', e => {
        header.classList.toggle('menu-open');
    });
    
    btnClose.addEventListener('click', e => {
        header.classList.toggle('menu-open');
    });
}

const footer = document.querySelector('#footer');

if (footer) {
    
}