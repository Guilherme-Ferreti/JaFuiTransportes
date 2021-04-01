import firebase from './firebase-app';
import { getFormValues, getLoaderHTML, resetForm } from './utils';

const contactPage = document.querySelector('#contact');
const db = firebase.firestore();

if (contactPage) {
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
            alert('Preencha o nome!');
        } else if (!email) {
            alert('Preencha o e-mail.');
        } else if (!subject) {
            alert('Preencha o assunto.');
        } else if (!message) {
            alert('Preencha a mensagem.');
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
                resetForm(form);
                
                alert('Contato enviado com sucesso.');
            }).catch(err => {
                alert('Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.');
            }).finally(() => {
                btnSubmit.innerText = 'Enviar';

                btnSubmit.disabled = false;
            });
        }
    });
}