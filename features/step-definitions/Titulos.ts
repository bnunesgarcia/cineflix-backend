import { Then, When } from "@cucumber/cucumber";
import { TitulosPages } from "../../src/pages/TitulosPages";

const titulosPage = new TitulosPages();

When('eu envio uma requisição GET para o endpoint {string} com os parâmetros:', async function (endpoint, dataTable) {
    const params = dataTable.rowsHash(); 
    await titulosPage.realizarRequisicaoGet(this, endpoint, params);
});

Then('a resposta de titulos deve conter os campos:', async function (dataTable) {
    await titulosPage.validarCamposTitulos(this, dataTable);
});

Then('a resposta deve conter o type {string}', async function (type) {
    await titulosPage.validarTypeFilme(this, type);
});

Then('a resposta deve conter o genero {string}', async function (genero) {
    await titulosPage.validarGeneroTitulo(this, genero);
});

Then('o campo {string} deve ser true', async function (nomeCampo) {
    await titulosPage.validarCampoBooleanoTrue(this, nomeCampo);
});

Then('o titulo da resposta deve conter {string}', async function (titulo) {
    await titulosPage.validarTituloNoResponse(this, titulo);
})

Then('a lista de nomes deve conter o termo {string}', async function (termoBusca) {
    await titulosPage.validarListaNomesContemTermo(this, termoBusca);
});