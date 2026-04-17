import { request, APIRequestContext, expect } from "@playwright/test";
import { RestUtils } from "../utils/RestUtils";
import { Api } from "../common/Api";

export class UsuariosPages {
    async listarUsuarioPorEmail(world: any, endpoint: string, email: string) {
        const authHeader = Api.token.startsWith('Bearer') ? Api.token : `Bearer ${Api.token}`;
        const cineflixContext: APIRequestContext = await request.newContext({
            baseURL: process.env.BASE_URL,
            extraHTTPHeaders: {
                'Authorization': authHeader,
                'Accept': 'application/json',
                'User-Agent': 'PostmanRuntime/7.35.0'
            }
        });

        const urlFinal = endpoint.includes('{email}') 
            ? endpoint.replace('{email}', email) 
            : `${endpoint}/${email}`;

        console.log(`🔍 Buscando usuário pelo e-mail: ${email}`);
        
        world.response = await cineflixContext.get(urlFinal);

        return world.response;
    }

    async validarEmailUsuario(world: any, emailEsperado: string) {
        const body = await world.response.json();
        expect(body.email).toBe(emailEsperado);
        
        console.log(`✅ Usuário confirmado: ${body.email}`);
    }

    async deletarUsuario(world: any, endpoint: string, idParaDeletar: number) {
        const authHeader = Api.token.startsWith('Bearer') ? Api.token : `Bearer ${Api.token}`;
        const cineflixContext: APIRequestContext = await request.newContext({
            baseURL: process.env.BASE_URL,
            extraHTTPHeaders: {
                'Authorization': authHeader,
                'Accept': 'application/json',
                'User-Agent': 'PostmanRuntime/7.35.0'
            }
        });

        world.response = await cineflixContext.delete(`${endpoint}/${idParaDeletar}`);

        return world.response;
    }
}