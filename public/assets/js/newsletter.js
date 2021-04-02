import firebase from './firebase-app';
import { getFormValues, getLoaderHTML, resetFormValues, showAlert } from './utils';

const newsletterEl = document.querySelector('.newsletter');
const db = firebase.firestore();

if (newsletterEl) {
    const form = newsletterEl.querySelector('form');
    const btnSubmit = form.querySelector('[type="submit"]');

    btnSubmit.addEventListener('click', async e => {
        e.preventDefault();

        const { name, email } = getFormValues(form);

        if (!name) {
            showAlert('warning', 'Preencha o nome.');
        } else if (!email) {
            showAlert('warning', 'Preencha o e-mail.');
        } else {

            btnSubmit.innerHTML = getLoaderHTML('white');
            btnSubmit.disabled = true;

            const data = {
                name: name,
                email: email,
                created_at: new Date(),
            }

            db.collection('newsletter').add(data).then(res => {
                showAlert('success', 'E-mail cadastrado com sucesso.');

                resetFormValues(form);
            }).catch(err => {
                showAlert('danger', 'Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.');
            }).finally(() => {
                btnSubmit.innerHTML = 'Cadastrar';
                
                btnSubmit.disabled = false;
            });
        }
    });
}