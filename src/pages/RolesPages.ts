import { request, APIRequestContext, expect } from "@playwright/test";
import { RestUtils } from "../utils/RestUtils";
import { Api } from "../common/Api";

export class RolesPages {
    async listarRoles(world: any, endpoint: string) {
    const authHeader = Api.token.startsWith('Bearer') ? Api.token : `Bearer ${Api.token}`;
        const cineflixContext: APIRequestContext = await request.newContext({
            baseURL: process.env.BASE_URL,
            extraHTTPHeaders: {
                'Authorization': authHeader,
                'Accept': 'application/json',
                'User-Agent': 'PostmanRuntime/7.35.0',
                'Connection': 'keep-alive'
            }
        });

        world.response = await cineflixContext.get(endpoint);

        return world.response;
    }

    async validarCamposRoles(world: any, dataTable: any) {
        const body = await world.response.json();
        const perfis = body.content;

        const camposEsperados = dataTable.raw().flat();

        perfis.forEach((perfil: any) => {
            const roles = perfil.roles;
            
            expect(Array.isArray(roles), `O campo roles do perfil ${perfil.id} não é um array`).toBe(true);

            roles.forEach((role: any) => {
                console.log(`Validando campos da role ID ${role.id} no perfil ${perfil.title}`);
                RestUtils.validateFields(role, camposEsperados);
            });
        });

        console.log(`✅ Todos os campos das roles foram validados com sucesso: ${camposEsperados.join(', ')}`);
    }

    async validarArrayRoles(world: any, dataTable: any) {
        const body = await world.response.json();
        const camposEsperados = dataTable.raw().flat();

        expect(Array.isArray(body), "A resposta da API não é um array de roles").toBe(true);

        body.forEach((role: any) => {
            console.log(`Validando campos da role ID ${role.id}: ${role.title}`);
            RestUtils.validateFields(role, camposEsperados);
        });

        console.log(`✅ Todas as ${body.length} roles foram validadas com sucesso: ${camposEsperados.join(', ')}`);
    }
}