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

    async alterarUsuario(world: any, endpoint: string, id: number) {
        const authHeader = Api.token.startsWith('Bearer') ? Api.token : `Bearer ${Api.token}`;
        
        const payload = {
            id: `${id}`,
            name: "Bruno Nunes Garcia",
            username: "brung",
            email: "brung@rederecord.com.br",
            active: true,
            profileId: 1,
            departmentId: 1
        };

        const cineflixContext: APIRequestContext = await request.newContext({
            baseURL: process.env.BASE_URL,
            extraHTTPHeaders: {
                'Authorization': authHeader,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'PostmanRuntime/7.35.0'
            }
        });

        console.log(`🔧 Alterando usuario ID: ${id}...`);
        
        world.response = await cineflixContext.patch(`${endpoint}`, {
            data: payload
        });

        return world.response;
    }

     async validarCamposUsuarios(world: any, dataTable: any) {
        const body = await world.response.json();
        const usuarios = body.content;
        const camposEsperados = dataTable.raw().flat();

        expect(Array.isArray(usuarios), "O campo 'content' não é um array").toBe(true);

        usuarios.forEach((usuario: any) => {
            console.log(`Validando campos do usuário: ${usuario.name}`);
            RestUtils.validateFields(usuario, camposEsperados);

            expect(usuario.department).toHaveProperty('id');
            expect(usuario.department).toHaveProperty('name');
            expect(usuario.accessProfile).toHaveProperty('title');
        });

        console.log(`✅ Todos os ${usuarios.length} usuários possuem os campos: ${camposEsperados.join(', ')}`);
    }
}