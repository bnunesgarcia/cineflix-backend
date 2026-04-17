import { BeforeAll, AfterAll, Then } from '@cucumber/cucumber';
import { Api } from '../../src/common/Api';

let api: Api;
let token: any;

BeforeAll(async function () {
    api = new Api();
    await api.setContext();
    token = api.getToken();
    console.log('Token global configurado com sucesso.');
});