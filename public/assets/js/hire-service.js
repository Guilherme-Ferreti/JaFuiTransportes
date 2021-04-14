import firebase from './firebase-app';
import { authCheck } from './auth';
import { formatCurrency, getFormValues, getLoaderHTML, getQueryString, makeToken, resetFormValues, showAlert } from './utils';
import Imask from 'imask';

const hireServicePage = document.querySelector('#hire-service-page');

if (hireServicePage) {

    const { service_id } = getQueryString();

    const next = 'hire-service.html' + (service_id ? '?service_id=' + service_id : '');

    authCheck('login.html?next=' + encodeURIComponent(next));

    const db = firebase.firestore();
    const loader = hireServicePage.querySelector('#loader');
    const form = hireServicePage.querySelector('form');
    const btnSubmit = form.querySelector('[type=submit]')

    const renderServicesOptions = services => {
        const selectEl = form.querySelector('#service');

        services.forEach(service => {
            const option = document.createElement('option');

            option.value = service.id;
            option.innerText = `${service.name} - ${formatCurrency(service.price)} por pacote`;

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

    btnSubmit.addEventListener('click', async e => {
        e.preventDefault();

        const values = getFormValues(form);

        if (!values.service) {
            showAlert('warning', 'Selecione o serviço.');
        } else if (!values.content) {
            showAlert('warning', 'Informe o conteúdo.');
        } else if (!values.description) {
            showAlert('warning', 'Preencha a descrição.');
        } else if (!values.recipient) {
            showAlert('warning', 'Informe o destinatário.');
        } else if (!values.cep) {
            showAlert('warning', 'Preencha o CEP.');
        } else if (!values.address) {
            showAlert('warning', 'Preencha o endereço.');
        } else {
            btnSubmit.innerHTML = getLoaderHTML();
            btnSubmit.disabled = true;

            try {
                const service = await db.collection('services').doc(values.service).get();

                const data = {
                    service_id: values.service,
                    content: values.content,
                    description: values.description,
                    recipient: values.recipient,
                    cep: values.cep,
                    address: values.address,
                    user_uid: sessionStorage.getItem('user_uid'),
                    status: 'Aguardando postagem pelo remetente',
                    track_code: makeToken(15),
                    send_at: new Date(),
                    shipping_cost: service.data().price
                }

                db.collection('packages').add(data).then(res => {
                    showAlert('success', 'Encomenda salva com sucesso.');
                    
                    resetFormValues(form);
                });

            } catch (err) {
                showAlert('danger', 'Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.');
            } finally {
                btnSubmit.innerText = 'Enviar';
                btnSubmit.disabled = false;
            }
        }
    });

    new Imask(form.querySelector('[name=cep]'), {
        mask: '00000-000'
    });
}