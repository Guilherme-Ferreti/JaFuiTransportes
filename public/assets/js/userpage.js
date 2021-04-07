import firebase from './firebase-app';
import { appendToTemplate } from './utils';
import { authCheck } from './auth';

const userPage = document.querySelector('#user-page');

if (userPage) {

    authCheck();

    const db = firebase.firestore();

    const renderPackages = (userPackages) => {

        const tableEl = userPage.querySelector('table');
        const tbodyEl = tableEl.querySelector('tbody');
        const loader = userPage.querySelector('#loader');

        tableEl.style.display = 'none';
        tbodyEl.innerHTML = '';
        loader.style.display = 'inline-block';

        userPackages.forEach((userPackage, index) => {

            userPackage.send_at =  new Date(userPackage.send_at.seconds * 1000).toLocaleDateString('pt-BR');

            appendToTemplate(tbodyEl, 'tr', 
            `<td>#${index + 1}</td>
            <td>${userPackage.track_code}</td>
            <td>${userPackage.description}</td>
            <td>${userPackage.status}</td>
            <td>${userPackage.send_at}</td>
            <td><img src="/assets/images/icons/info.svg" alt="Clique para mais informações"></td>`);
        });

        tableEl.style.display = 'block';
        loader.style.display = 'none';
    }

    const loadPackages = () => {

        const user_uid = sessionStorage.getItem('user_uid') ?? '';

        db.collection('packages').where('user_uid', '==', user_uid).onSnapshot(snapshot => {
            const UserPackages = [];

            snapshot.forEach(userPackage => UserPackages.push(userPackage.data()));

            renderPackages(UserPackages);
        });
    }

    loadPackages();
}