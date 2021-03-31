import firebase from './firebase-app';
import { getFormValues } from './utils';

const contactPage = document.querySelector('#contact');
const db = firebase.firestore();

if (contactPage) {
    const loader = document.querySelector('#loader');
    const form = contactPage.querySelector('form');
    const btnSubmit = form.querySelector('[type="submit"]');

    loader.style.display = 'none';
    form.style.display = 'flex';

    const loadContacts = async () => {

        const collection = await db.collection('contacts').doc('rZERVIQ1OAXYhelbOLUL').collection('subjects').get();

        console.log(collection.docs);

        collection.docs.forEach(subject => {

            console.log(subject.data());
        }); 
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
            btnSubmit.innerText = 'Enviando...';

            const data = {
                name: name,
                email: email,
                subject: subject,
                orderCode: orderCode,
                message: message,
                created_at: new Date(),
            }

            db.collection('contacts').add(data).then(res => {
                alert('Contato enviado com sucesso.');
            }).catch(err => {
                alert('Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.');
            }).finally(() => {
                btnSubmit.innerText = 'Enviar';
            });
        }
    });
}