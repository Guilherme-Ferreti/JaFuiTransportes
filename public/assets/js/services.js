import firebase from './firebase-app';
import { appendToTemplate } from './utils';

const db = firebase.firestore();
const servicesPage = document.querySelector("#services");

if (servicesPage) {

    const collection = db.collection('services').orderBy('created_at', 'desc');
    const cards = servicesPage.querySelector('.cards');

    collection.onSnapshot(snapshot => {
        cards.innerHTML = '';

        snapshot.docs.forEach(service => {
            service = service.data();

            const card = appendToTemplate(cards, 'div', 
            `   <div class="overlay"></div>
                <h2 class="title">${service.name}</h2>
                <p>${service.description}</p>
                <a href="login.html" class="button">Contratar</a>
            `);

            card.style.backgroundImage = `url(${service.image}`;
            card.classList.add('card');
        });
    });

}