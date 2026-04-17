import { Then, When } from "@cucumber/cucumber";
import { UsuariosPages } from "../../src/pages/UsuariosPages";

const usuariosPages = new UsuariosPages();

When('eu envio requisição GET para {string} com email {string}', async function (endpoint: string, email: string) {
    await usuariosPages.listarUsuarioPorEmail(this, endpoint, email);
});

Then('o campo email deve conter o email {string}', async function (email: string) {
    await usuariosPages.validarEmailUsuario(this, email);
});

When('envio uma requisição DELETE para {string} com o id {int}', async function (endpoint: string, id: number) {
    await usuariosPages.deletarUsuario(this, endpoint, id);
})