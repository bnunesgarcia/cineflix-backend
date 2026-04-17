import { Then, When } from "@cucumber/cucumber";
import { DepartmentPages } from "../../src/pages/DepartmentPages";

const departmentPage = new DepartmentPages();

When('eu envio uma requisição GET para {string} com page {int} e size {int}', async function (endpoint, page, size) {
    await departmentPage.listarDepartamentos(this, endpoint, page, size);
});

When('eu envio uma requisição GET para {string} enviando id {int}', async function (endpoint, id) {
    await departmentPage.listarDepartamentoPorId(this, endpoint, id);
});

When('eu envio uma requisição POST para {string} com os dados do departamento', async function (endpoint) {
    await departmentPage.criarDepartamento(this, endpoint);
});

When('envio uma requisição DELETE para {string} com o nome {}', async function (endpoint, nome) {
    await departmentPage.deletarDepartamentoPorNome(this, endpoint, nome);
});

When('eu envio uma requisição PATCH para {string} com dados para alteracao com o id {int}', async function (endpoint, id) {
    await departmentPage.alterarDepartamento(this, endpoint, id);
});

Then('a resposta deve conter uma lista', async function () {
    await departmentPage.validarPresencaDeLista(this);
});

Then('o response deve conter os campos {string}, {string} e {string}', async function (f1, f2, f3) {
    await departmentPage.validarCamposObrigatorios(this, [f1, f2, f3]);
});

Then('a resposta deve conter os dados do departamento criado', async function () {
    await departmentPage.validarDadosDepartamentoCriado(this);
});

Then('a resposta deve conter o id {int}', async function (id) {
    await departmentPage.validarIdDepartamento(this, id);
});
