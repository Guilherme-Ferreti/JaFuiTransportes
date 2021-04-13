import firebase from './firebase-app';
import { appendToTemplate } from './utils';

const db = firebase.firestore();
const servicesPage = document.querySelector("#services-page");

if (servicesPage) {
    const renderServices = services => {
        const cards = servicesPage.querySelector('.cards');
        
        cards.innerHTML = '';

        services.forEach(service => {
            const card = appendToTemplate(cards, 'div', 
            `   <div class="overlay"></div>
                <h2 class="title">${service.name}</h2>
                <p>${service.description}</p>
                <a href="hire-service.html?service_id=${service.id}" class="button">Contratar</a>
            `);

            card.style.backgroundImage = `url(${service.image}`;

            card.classList.add('card');
        });
    }

    const loadServices = () => {  
        const collection = db.collection('services').orderBy('created_at', 'desc');

        collection.onSnapshot(snapshot => {
            const services = [];

            snapshot.docs.forEach(service => services.push(Object.assign({id: service.id}, service.data())));

            renderServices(services);
        });
    }

    loadServices();
}