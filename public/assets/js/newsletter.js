import firebase from './firebase-app';
import { getFormValues } from './utils';

const newsletterEl = document.querySelector('.newsletter');
const db = firebase.firestore();

if (newsletterEl) {
    const form = newsletterEl.querySelector('form');
    const btnSubmit = form.querySelector('[type="submit"]');

    btnSubmit.addEventListener('click', async e => {
        e.preventDefault();

        const { name, email } = getFormValues(form);

        if (!name) {
            alert('Preencha o nome!');
        } else if (!email) {
            alert('Preencha o e-mail.');
        } else {
            btnSubmit.innerText = 'Enviando...';

            const data = {
                name: name,
                email: email,
                created_at: new Date(),
            }

            db.collection('newsletter').add(data).then(res => {
                alert('Cadastro realizado com sucesso.');
            }).catch(err => {
                alert('Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.');
            }).finally(() => {
                btnSubmit.innerText = 'Cadastrar';
            });
        }
    });
}