import firebase from './firebase-app';
import { authCheck } from './auth';
import { getQueryString } from './utils';

const hireServicePage = document.querySelector('#hire-service-page');

if (hireServicePage) {

    const { service_id } = getQueryString();

    const next = 'next=hire-service.html' + (service_id ? '?service_id=' + service_id : '');

    authCheck('login.html?' + encodeURI(next));

    const db = firebase.firestore();
    const loader = hireServicePage.querySelector('#loader');
    const form = hireServicePage.querySelector('form');

    const renderServicesOptions = services => {
        const selectEl = form.querySelector('#services');

        services.forEach(service => {
            const option = document.createElement('option');

            option.value = service.id;
            option.innerText = service.name;

            if (service.id === service_id) option.selected = true;

            selectEl.append(option);
        });

        loader.style.display = 'none';
        form.style.display = 'flex';
    }

    const loadServicesOptions = async () => {
        const collection = await db.collection('services').get();
        
        const services = [];

        collection.docs.forEach(service => services.push(Object.assign({id: service.id}, service.data())));

        renderServicesOptions(services);
    }

    loadServicesOptions();
}