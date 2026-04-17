import { Then, When } from "@cucumber/cucumber";
import { RolesPages } from "../../src/pages/RolesPages";

const rolesPage = new RolesPages();

When('eu envio uma requisição GET para {string}', async function (endpoint) {
    await rolesPage.listarRoles(this, endpoint);
});

Then('o campo roles deve conter os campos:', async function (dataTable) {
    await rolesPage.validarCamposRoles(this, dataTable);
});

Then('o array de roles deve conter:', async function (dataTable) {
    await rolesPage.validarArrayRoles(this, dataTable);
});