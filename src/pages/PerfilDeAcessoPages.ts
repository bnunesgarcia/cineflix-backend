import { request, APIRequestContext, expect } from "@playwright/test";
import { RestUtils } from "../utils/RestUtils";
import { Api } from "../common/Api";

export class PerfilDeAcessoPages {
    async validarCampo(world: any, campo: string) {
        const body = await world.response.json();
        const itens = body.content;

        expect(Array.isArray(itens), "O campo 'content' não é um array").toBe(true);

        itens.forEach((perfil: any) => {
            expect(perfil, `O perfil ID ${perfil.id} não possui o campo ${campo}`).toHaveProperty(campo);
        });
        
        console.log(`✅ Campo '${campo}' validado em todos os perfis.`);
    }

    async criarPerfilDeAcesso(world: any, endpoint: string) {
        const authHeader = Api.token.startsWith('Bearer') ? Api.token : `Bearer ${Api.token}`;
        const titleRandom = `Perfil_${Math.floor(Math.random() * 10000)}`;

        const payload = {
            title: titleRandom,
            description: "Perfil de acesso gerado via automação",
            roles: [1,2,3]
        };

        world.dadosEnviados = payload; // Armazenamos os dados enviados para validação posterior

        const cineflixContext: APIRequestContext = await request.newContext({
            baseURL: process.env.BASE_URL,
            extraHTTPHeaders: {
                'Authorization': authHeader,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'PostmanRuntime/7.35.0',
                'Connection': 'keep-alive'
            }
        });

        world.response = await cineflixContext.post(endpoint, {
            data: payload
        });

        console.log(`🚀 Criando perfil de acesso: ${titleRandom}`);
        return world.response;
    }

    async validarPerfilCriado(world: any) {
        const body = await world.response.json();
        const esperado = world.dadosEnviados;

        expect(body).toHaveProperty('id');
        expect(typeof body.id).toBe('number');
        
        expect(body.title).toBe(esperado.title);
        expect(body.description).toBe(esperado.description);

        expect(body.roles.length).toBe(esperado.roles.length);

        const idsRecebidos = body.roles.map((role: any) => role.id);
        expect(idsRecebidos.sort()).toEqual(esperado.roles.sort());

        body.roles.forEach((role: any) => {
            expect(role).toHaveProperty('value');
            expect(role).toHaveProperty('enabled', true);
        });

        console.log(`✅ Perfil "${body.title}" validado com IDs de roles: ${idsRecebidos}`);
    }

    async alterarPerfilDeAcesso(world: any, endpoint: string) {
        const authHeader = Api.token.startsWith('Bearer') ? Api.token : `Bearer ${Api.token}`;
        
        const payload = {
            id: 1,
            title: "Editor Updated",
            description: "Perfil atualizado",
            roles: [1,2]
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

        console.log(`🔧 Alterando perfil de acesso `);
        
        world.response = await cineflixContext.patch(`${endpoint}`, {
            data: payload
        });

        return world.response;
    }

    async deletarPerfilDeAcessoPorTitulo(world: any, endpoint: string, tituloParaDeletar: string) {
        const authHeader = Api.token.startsWith('Bearer') ? Api.token : `Bearer ${Api.token}`;
        const cineflixContext: APIRequestContext = await request.newContext({
            baseURL: process.env.BASE_URL,
            extraHTTPHeaders: {
                'Authorization': authHeader,
                'Accept': 'application/json',
                'User-Agent': 'PostmanRuntime/7.35.0'
            }
        });

        const responseGet = await cineflixContext.get(endpoint);
        const body = await responseGet.json();
        const perfisDeAcesso = body.content;

        const perfilEncontrado = perfisDeAcesso.find((d: any) => d.title === tituloParaDeletar);

        if (!perfilEncontrado) {
            throw new Error(`❌ Não foi possível encontrar um perfil de acesso com o nome: ${tituloParaDeletar}`);
        }

        const idParaDeletar = perfilEncontrado.id;
        console.log(`🔍 Perfil de acesso "${tituloParaDeletar}" encontrado com ID: ${idParaDeletar}. Deletando...`);
        world.response = await cineflixContext.delete(`${endpoint}/${idParaDeletar}`);

        return world.response;
    }
}