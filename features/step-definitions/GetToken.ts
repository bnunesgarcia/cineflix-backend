import { Given, Then } from "@cucumber/cucumber";
import { AuthPages } from "../../src/pages/AuthPages";
import { RestUtils } from "../../src/utils/RestUtils";

const authPage = new AuthPages();

Given('que eu obtenho o token de autenticação', async function () {
    await authPage.obterTokenEArmazenarContexto(this);
});

Then('o status da resposta deve ser {int}', async function (status: number) {
    await RestUtils.validateStatus(this.response, status);
});