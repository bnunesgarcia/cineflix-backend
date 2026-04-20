import { Then, When } from "@cucumber/cucumber";
import { LogDeAtividadesPages } from "../../src/pages/LogDeAtividadesPages";

const logDeAtividadesPages = new LogDeAtividadesPages();

Then('o response de log de atividades deve conter os campos:', async function (dataTable) {
    await logDeAtividadesPages.validarCamposLogAtividades(this, dataTable);
});