import { expect, APIResponse } from "@playwright/test";

export class RestUtils {

    static async validateStatus(response: APIResponse, expectedStatus: number) {
        const status = response.status();
        if (status !== expectedStatus) {
            const errorBody = await response.text();
            throw new Error(
                `Esperado: ${expectedStatus} | Recebido: ${status}\nConteúdo: ${errorBody.substring(0, 500)}`
            );
        }
        console.log(`✅ Status verificado: ${status}`);
    }

    static async validateFields(item: any, fields: string[]) {
        fields.forEach(field => {
            expect(item, `Campo '${field}' não encontrado no objeto`).toHaveProperty(field);
        });
    }

}