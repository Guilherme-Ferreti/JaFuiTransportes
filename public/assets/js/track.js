import firebase from './firebase-app';
import { formatCurrency, getFormValues, getLoaderHTML, getQueryString, makeToken, resetFormValues, showAlert } from './utils';

const trackPage = document.querySelector('#track-page');

if (trackPage) {
    const db = firebase.firestore();

    const form = trackPage.querySelector('form');
    const btnSubmit = form.querySelector('[type="submit"]');

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const { code } = getFormValues(form);

        if (!code) {
            showAlert('warning', 'Preencha o código.');
        } else {

            btnSubmit.innerHTML = getLoaderHTML();
            btnSubmit.disabled = true;

            db.collection('packages').where('track_code', '==', code).limit(1).get().then(snapshot => {

                let index = 0;

                snapshot.forEach(doc => {
                    form.querySelector('#status').innerText = doc.data().status;
                    index++;
                });

                if (index === 0) showAlert('danger', 'Encomenda não encontrada.');

            }).catch(err => {
                showAlert('danger', 'Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.');
            }).finally(() => {
                btnSubmit.innerText = 'Enviar';
                btnSubmit.disabled = false;
            });
        }
    });
}