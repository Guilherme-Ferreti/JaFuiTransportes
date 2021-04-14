import firebase from './firebase-app';
import { appendToTemplate, formatCurrency } from './utils';
import { authCheck } from './auth';

const userPage = document.querySelector('#user-page');

if (userPage) {

    authCheck();

    const db = firebase.firestore();
    const modal = document.querySelector('.modal');

    const renderPackages = (userPackages) => {
        const tableEl = userPage.querySelector('table');
        const tbodyEl = tableEl.querySelector('tbody');
        const loader = userPage.querySelector('#loader');

        tableEl.style.display = 'none';
        tbodyEl.innerHTML = '';
        loader.style.display = 'inline-block';

        userPackages.forEach((userPackage, index) => {
            userPackage.send_at =  new Date(userPackage.send_at.seconds * 1000).toLocaleDateString('pt-BR');

            const trEl = appendToTemplate(tbodyEl, 'tr', 
            `<td>#${index + 1}</td>
            <td>${userPackage.id}</td>
            <td>${userPackage.recipient}</td>
            <td>${userPackage.status}</td>
            <td>${userPackage.send_at}</td>
            <td><img src="/assets/images/icons/info.svg" alt="Clique para mais informações" id="info"></td>`);

            setModal(trEl, userPackage);
        });

        tableEl.style.display = 'block';
        loader.style.display = 'none';
    }

    const setModal = (trEl, userPackage) => {
        const content = modal.querySelector('.content');

        trEl.querySelector('#info').addEventListener('click', e => {
            console.log(userPackage);

            content.innerHTML = `
                <h3>Sua Encomenda #</h3>
                <hr/>
                <p>
                    <b>Status:</b> ${userPackage.status} <br/> 
                    <i>Código de rastreio:</i> ${userPackage.id} <br/> 
                    <i>Descrição:</i> ${userPackage.description} <br/>
                    <i>Conteúdo:</i> ${userPackage.content} <br/>
                    <i>Destinatário: </i> ${userPackage.recipient} <br/>
                    <i>Endereço de entrega:</i> ${userPackage.address} (${userPackage.cep}) <br/>
                    <i>Enviado em:</i> ${userPackage.send_at} <br/>
                    <i>Custos de envio:</i> ${formatCurrency(userPackage.shipping_cost)}
                </p>
            `;

            modal.classList.add('show');
        });
    }

    const loadPackages = () => {
        const user_uid = sessionStorage.getItem('user_uid') ?? '';

        db.collection('packages').where('user_uid', '==', user_uid).onSnapshot(snapshot => {
            const UserPackages = [];

            snapshot.forEach(userPackage => UserPackages.push(Object.assign({id: userPackage.id}, userPackage.data())));

            renderPackages(UserPackages);
        });
    }

    modal.querySelector('.btn-close').addEventListener('click', e => modal.classList.remove('show'));

    loadPackages();
}