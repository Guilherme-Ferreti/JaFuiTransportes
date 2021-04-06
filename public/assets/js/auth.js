import firebase from './firebase-app';
import { getFormValues, getLoaderHTML, showAlert, translateMessage } from './utils';

const auth = firebase.auth();

export function authCheck(redirect = 'login.html') 
{
    const userLoggedIn = (sessionStorage.getItem('user_logged_in') === 'true') ? true : false;

    if (!userLoggedIn && redirect) {
        window.location.href = redirect;
    }

    return userLoggedIn;
}

export function guestCheck(redirect = 'index.html') 
{
    const userLoggedIn = (sessionStorage.getItem('user_logged_in') === 'true') ? true : false;

    if (userLoggedIn && redirect) {
        window.location.href = redirect;
    } else {
        // If a user is logged in, guest does not exist
        return userLoggedIn ? false : true;
    }
}

auth.onAuthStateChanged(user => {
    if (user) {
        sessionStorage.setItem('user_logged_in', 'true');
    } else {
        sessionStorage.setItem('user_logged_in', 'false');
    }
});

const loginPage = document.querySelector('#login');
const forgotPasswordPage = document.querySelector('#forgot-password');

if (loginPage) {
    guestCheck();
    
    const form = loginPage.querySelector('form');
    const btnSubmit = form.querySelector('[type="submit"]');

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const { email, password } = getFormValues(form);

        if (!email) {
            showAlert('warning', 'Preencha o E-mail.');
        } else if (!password) {
            showAlert('warning', 'Preencha a senha.');
        } else {

            btnSubmit.disabled = true;
            btnSubmit.innerHTML = getLoaderHTML('white');

            try {
                await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

                await auth.signInWithEmailAndPassword(email, password);

                window.location.href = 'userpage.html';
            } catch(err) {
                showAlert('danger', translateMessage(err.code));
            } finally {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = 'Entrar';
            }  
        }
    });
}

if (forgotPasswordPage) {
    const form = document.querySelector('form');
    const btnSubmit = form.querySelector('[type="submit"]');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const { email } = getFormValues(form);

        if (!email) {
            showAlert('warning', 'Preencha o e-mail.')
        } else {
            
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = getLoaderHTML('white');

            auth.sendPasswordResetEmail(email)
                .then(res => {
                    showAlert('success', 'E-mail de recuperação enviado com sucesso.');

                    resetFormValues(form);
                }).catch(err => {
                    showAlert('danger', translateMessage(err.code));
                })
                .finally(() => {
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = 'Enviar';
                });
        }
    });
}
