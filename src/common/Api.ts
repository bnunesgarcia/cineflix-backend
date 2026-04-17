import { request, APIRequest } from '@playwright/test';

import * as dotenv from 'dotenv';
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export class Api {
    public static token: string;
    public lastResponse: any;
    private urlAuth: string;
    private tokenContext: any;

    constructor() {
        // Pegamos a URL base do Azure do ENV
        this.urlAuth = process.env.URL_AUTH_MICROSOFT || '';
    }

    public async setContext() {
        this.tokenContext = await request.newContext({
            baseURL: this.urlAuth,
            // O Playwright preenche o Content-Type automaticamente ao usar 'form'
        });
    }

    public async getToken() {
        if (!this.tokenContext) {
            throw new Error("Contexto não definido. Chame setContext() primeiro.");
        }

        // console.log(`URL MICROSOFT:${process.env.URL_AUTH_MICROSOFT}`);

        const response = await this.tokenContext.post(process.env.URL_AUTH_MICROSOFT, {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                grant_type: 'client_credentials',
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                scope: process.env.SCOPE, // Azure exige scope para client_credentials
            },
        });

        if (!response.ok()) {
            throw new Error(`Falha ao obter token: ${response.status()} ${response.statusText()}`);
        }

        this.lastResponse = response;
        const body = await response.json();
        Api.token = body.access_token;
        return Api.token; // Retorna apenas a string do token
    }
}