// src/pages/AuthPage.ts
import { Api } from "../common/Api";

export class AuthPages {
    private api: Api;

    constructor() {
        this.api = new Api();
    }

    async obterTokenEArmazenarContexto(world: any) {
        await this.api.setContext();
        const token = await this.api.getToken();

        world.token = token;
        world.response = this.api.lastResponse;

        return token;
    }
}