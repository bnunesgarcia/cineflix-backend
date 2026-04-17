import { Then, When } from "@cucumber/cucumber";
import { PerfilDeAcessoPages } from "../../src/pages/PerfilDeAcessoPages";

const perfilDeAcessoPage = new PerfilDeAcessoPages();

Then('deve existir o campo {string}', async function (campo: string) {
    await perfilDeAcessoPage.validarCampo(this, campo);
});

When('eu envio uma requisição POST para {string} com os dados do perfil', async function (endpoint) {
    await perfilDeAcessoPage.criarPerfilDeAcesso(this, endpoint);
});

Then('a resposta deve conter os dados do perfil criado', async function () {
    await perfilDeAcessoPage.validarPerfilCriado(this);
});

When('eu envio uma requisição PATCH para {string}', async function (endpoint) {
    await perfilDeAcessoPage.alterarPerfilDeAcesso(this, endpoint);
});

When('envio uma requisição DELETE para {string} com o titulo {}', async function (endpoint, titulo) {
    await perfilDeAcessoPage.deletarPerfilDeAcessoPorTitulo(this, endpoint, titulo);
})