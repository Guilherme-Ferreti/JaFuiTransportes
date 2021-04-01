import firebase from './firebase-app';
import { getFormValues, getLoaderHTML } from './utils';

const registerPage = document.querySelector('#register');

if (registerPage) {
    const db = firebase.firestore();
    const form = registerPage.querySelector('form');
    const btnSubmit = form.querySelector('[type="submit"]');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const { name, email, login, password } = getFormValues(form);

        if (!name) {
            alert('Preencha o nome!')
        } else if (!email) {
            alert('Preencha o e-mail!')
        } else if (!password) {
            alert('Preencha a senha!')
        } else {

            btnSubmit.innerHTML = getLoaderHTML('white');
            btnSubmit.disabled = true;

            const auth = firebase.auth();

            auth.createUserWithEmailAndPassword(email, password)
                .then(res => {
                    
                })
                .catch(err => {
                    alert(err.message);
                })
                .finally(() => {
                    btnSubmit.innerHTML = 'Cadastrar';

                    btnSubmit.disabled = false;
                })
        }
    })
}