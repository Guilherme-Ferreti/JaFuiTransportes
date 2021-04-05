import firebase from './firebase-app';
import { authCheck } from "./auth";
import { appendToTemplate, showAlert } from "./utils";

const header = document.querySelector('#header');
const footer = document.querySelector('#footer');

if (header) {
    header.querySelector('#btn-open').addEventListener('click', e => {
        header.classList.toggle('menu-open');
    });
    
    header.querySelector('#btn-close').addEventListener('click', e => {
        header.classList.toggle('menu-open');
    });

    if (authCheck(false)) {

        const navbar = header.querySelector('nav ul');
    
        navbar.querySelector('li [href="login.html"]').href = 'index.html';
    
        navbar.querySelector('li [href="register.html"]').remove();
    
        const logoutEl = appendToTemplate(navbar, 'li', '<a href="#">Sair</a>');
    
        logoutEl.addEventListener('click', () => {

            firebase.auth().signOut()
                .then(res => {
                    window.location.href = 'login.html';
                })
                .catch(err => {
                    showAlert('danger', err.code)
                });
        });
    }
}

if (footer) {
    footer.querySelector('#rights-reserved').innerHTML = `© ${new Date().getFullYear()} Todos os direitos reservados.`;
}