import firebase from './firebase-app';
import { getFormValues, getLoaderHTML, resetFormValues, showAlert, translateMessage } from './utils';
import { authCheck, guestCheck } from './auth';

const registerPage = document.querySelector('#register');

if (registerPage) {
    
    guestCheck();

    const form = registerPage.querySelector('form');
    const btnSubmit = form.querySelector('[type="submit"]');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const { name, email, password } = getFormValues(form);

        if (!name) {
            showAlert('warning', 'Preencha o nome.');
        } else if (!email) {
            showAlert('warning', 'Preencha o e-mail.');
        } else if (!password) {
            showAlert('warning', 'Preencha a senha.');
        } else {

            btnSubmit.innerHTML = getLoaderHTML('white');
            btnSubmit.disabled = true;

            const auth = firebase.auth();

            auth.createUserWithEmailAndPassword(email, password)
                .then(res => {
                    showAlert('success', 'Cadastro realizado com sucesso.');

                    resetFormValues(form);
                })
                .catch(err => {
                    showAlert('danger', translateMessage(err.code));
                })
                .finally(() => {
                    btnSubmit.innerHTML = 'Cadastrar';

                    btnSubmit.disabled = false;
                })
        }
    })
}