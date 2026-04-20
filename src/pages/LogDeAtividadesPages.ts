import { request, APIRequestContext, expect } from "@playwright/test";
import { RestUtils } from "../utils/RestUtils";
import { Api } from "../common/Api";

export class LogDeAtividadesPages {

     async validarCamposLogAtividades(world: any, dataTable: any) {
        const body = await world.response.json();
        const logs = body.content;
        const camposEsperados = dataTable.raw().flat();

        expect(Array.isArray(logs), "O campo 'content' não é um array").toBe(true);
        expect(logs.length).toBeGreaterThan(0);

        logs.forEach((log: any, index: number) => {
            console.log(`Validando log índice [${index}] - ID: ${log.id}`);
            RestUtils.validateFields(log, camposEsperados);

            expect(typeof log.id).toBe('number');
            expect(typeof log.username).toBe('string');
            expect(log.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}/);
        });

        console.log(`✅ Todos os ${logs.length} logs possuem os campos: ${camposEsperados.join(', ')}`);
    }
}