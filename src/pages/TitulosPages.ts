import { request, APIRequestContext, expect } from "@playwright/test";
import { Api } from "../common/Api";
import { RestUtils } from "../utils/RestUtils";

export class TitulosPages {

    // Método privado para evitar repetir a criação do contexto/headers em todo método
    private async getContext(world: any) {
        const authHeader = Api.token.startsWith('Bearer') ? Api.token : `Bearer ${Api.token}`;
        return await request.newContext({
            baseURL: process.env.BASE_URL,
            extraHTTPHeaders: {
                'Authorization': authHeader,
                'Accept': 'application/json',
                'User-Agent': 'PostmanRuntime/7.35.0'
            }
        });
    }

    // MÉTODO ÚNICO: Aceita qualquer query param
    async realizarRequisicaoGet(
        world: any, 
        endpoint: string,
        queryParams: Record<string, string | number | boolean> = {}) {
        const context = await this.getContext(world);
        
        world.response = await context.get(endpoint, {
            params: queryParams
        });

        return world.response;
    }

    async validarCamposTitulos(world: any, dataTable: any) {
        const body = await world.response.json();
        const titulos = body.content;
        const camposEsperados = dataTable.raw().flat();

        expect(Array.isArray(titulos), "O campo 'content' não é um array").toBe(true);

        titulos.forEach((titulo: any) => {
            console.log(`Validando campos do título ID: ${titulo.id} - ${titulo.title}`);
            RestUtils.validateFields(titulo, camposEsperados);
        });

        console.log(`✅ Todos os ${titulos.length} títulos possuem os campos: ${camposEsperados.join(', ')}`);
    }

    async validarTypeFilme(world: any, typeEsperado: string) {
        const body = await world.response.json();
        const filmes = body.content;

        expect(Array.isArray(filmes)).toBe(true);

        filmes.forEach((filme: any) => {
            expect(filme.type, `O tipo do filme ID ${filme.id} (${filme.type}) não é igual ao esperado (${typeEsperado})`)
                .toBe(typeEsperado);
            
            expect(typeof filme.type).toBe('string');
        });

        console.log(`✅ Todos os ${filmes.length} filmes da página são do tipo: ${typeEsperado}`);
    }

    async validarGeneroTitulo(world: any, generoEsperado: string) {
        const body = await world.response.json();
        const titulos = body.content; // Acessa a lista de títulos

        // 1. Garante que a lista existe
        expect(titulos, "O campo 'content' não foi encontrado na resposta").toBeDefined();
        
        // 2. Percorre cada título da lista
        titulos.forEach((titulo: any) => {
            // Valida o gênero de cada um individualmente
            expect(titulo.genre, `O título ID ${titulo.id} possui gênero (${titulo.genre}) diferente do esperado (${generoEsperado})`)
                .toBe(generoEsperado);
                
            // Valida se o campo é uma string
            expect(typeof titulo.genre).toBe('string');
        });

        console.log(`✅ Sucesso: Todos os ${titulos.length} títulos da página são do gênero ${generoEsperado}.`);
    }

    async validarCampoBooleanoTrue(world: any, nomeCampo: string) {
        const body = await world.response.json();
        const titulos = body.content;

        expect(Array.isArray(titulos), "O campo 'content' não é um array").toBe(true);

        titulos.forEach((titulo: any) => {
            // Acessamos o campo dinamicamente usando [nomeCampo]
            const valorCampo = titulo[nomeCampo];

            expect(valorCampo, `O título ID ${titulo.id} possui o campo '${nomeCampo}' como ${valorCampo}, mas era esperado true`)
                .toBe(true);
                
            expect(typeof valorCampo).toBe('boolean');
        });

        console.log(`✅ Sucesso: O campo '${nomeCampo}' é true em todos os ${titulos.length} títulos.`);
    }

    async validarTituloNoResponse(world: any, tituloEsperado: string) {
        const body = await world.response.json();
        
        // Se o body for um array direto ou se estiver dentro de .content
        const titulos = Array.isArray(body) ? body : body.content;

        // Buscamos se existe ao menos um título na lista que corresponde ao esperado
        const tituloEncontrado = titulos.find((t: any) => t.title === tituloEsperado);

        expect(tituloEncontrado, `O título "${tituloEsperado}" não foi encontrado na resposta da API`).toBeDefined();
        
        // Validação extra de igualdade exata
        expect(tituloEncontrado.title).toBe(tituloEsperado);

        console.log(`✅ Título confirmado: ${tituloEncontrado.title}`);
    }

    async validarListaNomesContemTermo(world: any, termoBusca: string) {
        const listaNomes: string[] = await world.response.json();
        const termoLowerCase = termoBusca.toLowerCase();

        expect(Array.isArray(listaNomes), "A resposta não é um array de nomes").toBe(true);
        expect(listaNomes.length).toBeGreaterThan(0);

        listaNomes.forEach((nome: string) => {
            // .trim() remove espaços no início/fim e .toLowerCase() ignora o Case Sensitive
            const nomeLimpo = nome.trim().toLowerCase();
            
            expect(nomeLimpo, `O nome "${nome}" não contém o termo de busca "${termoBusca}"`)
                .toContain(termoLowerCase);
        });

        console.log(`✅ Validado: Todos os ${listaNomes.length} nomes contêm o termo "${termoBusca}".`);
    }
}