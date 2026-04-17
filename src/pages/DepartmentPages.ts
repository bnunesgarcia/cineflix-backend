import { request, APIRequestContext, expect } from "@playwright/test";
import { Api } from "../common/Api";
import { RestUtils } from "../utils/RestUtils";

export class DepartmentPages {
    async listarDepartamentos(world: any, endpoint: string, page: number, size: number) {
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

        world.response = await cineflixContext.get(endpoint, {
            params: { page, size }
        });

        return world.response;
    }

    async listarDepartamentoPorId(world: any, endpoint: string, id: number) {
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

        world.response = await cineflixContext.get(`${endpoint}/${id}`);

        return world.response;
    }

    async validarPresencaDeLista(world: any) {
        const body = await world.response.json();
        expect(body, "O corpo da resposta deveria ter a propriedade 'content'").toHaveProperty('content');
        return body; // Retornamos o corpo caso precise usar em seguida
    }

    async validarCamposObrigatorios(world: any, campos: string[]) {
        const body = await world.response.json();
        const departamentos = body.content;

        expect(Array.isArray(departamentos), "O campo 'content' não é um Array").toBe(true);

        departamentos.forEach((departamento: any) => {
            RestUtils.validateFields(departamento, campos);
        });
        
        console.log(`✅ Todos os ${departamentos.length} departamentos contêm os campos: ${campos.join(', ')}`);
    }

    async criarDepartamento(world: any, endpoint: string) {
        const authHeader = Api.token.startsWith('Bearer') ? Api.token : `Bearer ${Api.token}`;
        const nomeRandom = `Tecnologia_${Math.floor(Math.random() * 10000)}`;

        const payload = {
            name: nomeRandom,
            description: "Departamento de TI gerado via automação"
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

        console.log(`🚀 Criando departamento: ${nomeRandom}`);
        return world.response;
    }

    async alterarDepartamento(world: any, endpoint: string, id: number) {
        const authHeader = Api.token.startsWith('Bearer') ? Api.token : `Bearer ${Api.token}`;
        
        const payload = {
            name: "Tecnologia da Informação",
            description: "Departamento de TI atualizado"
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

        console.log(`🔧 Alterando departamento ID: ${id}...`);
        
        world.response = await cineflixContext.patch(`${endpoint}/${id}`, {
            data: payload
        });

        return world.response;
    }

    async deletarDepartamentoPorNome(world: any, endpoint: string, nomeParaDeletar: string) {
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
        const departamentos = body.content;

        const deptoEncontrado = departamentos.find((d: any) => d.name === nomeParaDeletar);

        if (!deptoEncontrado) {
            throw new Error(`❌ Não foi possível encontrar um departamento com o nome: ${nomeParaDeletar}`);
        }

        const idParaDeletar = deptoEncontrado.id;
        console.log(`🔍 Departamento "${nomeParaDeletar}" encontrado com ID: ${idParaDeletar}. Deletando...`);
        world.response = await cineflixContext.delete(`${endpoint}/${idParaDeletar}`);

        return world.response;
    }

    async validarDadosDepartamentoCriado(world: any) {
        const body = await world.response.json();
        const esperado = world.dadosEnviados;

        expect(body).toHaveProperty('id'); // O ID é gerado pelo banco, então validamos apenas se existe
        expect(typeof body.id).toBe('number');
        
        expect(body.name).toBe(esperado.name);
        expect(body.description).toBe(esperado.description);

        console.log(`✅ Departamento validado com sucesso: ID ${body.id} | Nome: ${body.name}`);
    }

    async validarIdDepartamento(world: any, idEsperado: number) {
        const body = await world.response.json();
        expect(body.id, `O ID retornado (${body.id}) não é igual ao esperado (${idEsperado})`).toBe(idEsperado);
        expect(typeof body.id).toBe('number');
    }
}