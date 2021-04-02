import firebase from './firebase-app';
import { getFormValues, getLoaderHTML, resetFormValues, showAlert } from './utils';

const contactPage = document.querySelector('#contact');

if (contactPage) {
    const db = firebase.firestore();
    const loader = document.querySelector('#loader');
    const form = contactPage.querySelector('form');
    const btnSubmit = form.querySelector('[type="submit"]');
    const selectEl = form.querySelector('#subject')

    const loadContacts = async () => {
        const collection = await db.collection('contact-subjects').orderBy('name', 'asc').get();

        collection.docs.forEach(subject => {
            subject = subject.data();

            const option = document.createElement('option');

            option.value = subject.name;
            option.innerText = subject.name;

            selectEl.append(option);
        }); 

        loader.style.display = 'none';
        form.style.display = 'flex';
    }

    loadContacts();

    btnSubmit.addEventListener('click', async e => {
        e.preventDefault();

        const { name, email, subject, orderCode, message } = getFormValues(form);

        if (!name) {
            showAlert('warning', 'Preencha o nome!');
        } else if (!email) {
            showAlert('warning', 'Preencha o e-mail.');
        } else if (!subject) {
            showAlert('warning', 'Preencha o assunto!');
        } else if (!message) {
            showAlert('warning', 'Preencha a mensagem!');
        } else {

            btnSubmit.innerHTML = getLoaderHTML();
            btnSubmit.disabled = true;

            const data = {
                name: name,
                email: email,
                subject: subject,
                orderCode: orderCode,
                message: message,
                created_at: new Date(),
            }

            db.collection('contacts').add(data).then(res => { 
                showAlert('success', 'Contato enviado com sucesso.');
                
                resetFormValues(form);
            }).catch(err => {
                showAlert('danger', 'Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.');
            }).finally(() => {
                btnSubmit.innerText = 'Enviar';

                btnSubmit.disabled = false;
            });
        }
    });
}