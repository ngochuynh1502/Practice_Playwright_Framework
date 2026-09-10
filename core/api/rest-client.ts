import { APIRequestContext } from "@playwright/test";
import { APIRequestBuilder } from "./api-request";

export type Serializable = unknown;

export interface RestClientRequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
    data?: string | Buffer | Serializable;
    form?: Record<string, string | number | boolean>;
    ignoreHTTPSErrors?: boolean;
    maxRedirects?: number;
    multipart?: Record<string, string | number | boolean | {
        name: string;
        mimeType: string;
        buffer: Buffer;
    }>;
    timeout?: number;
    failOnStatusCode?: boolean;
}

export class RestClient {
    private _requestContext: APIRequestContext;
    private _apiRequestBuilder: APIRequestBuilder;

    constructor(requestContext: APIRequestContext) {
        this._apiRequestBuilder = new APIRequestBuilder();
        this._requestContext = requestContext
    }

    requestBuilder() {
        return this._apiRequestBuilder;
    }

    async get(url: string, options?: RestClientRequestOptions) {
        console.log(`GET request to ${url} with options:`, options);
        return await this._requestContext.get(url, options);
    }

    async post(url: string, options?: RestClientRequestOptions) {
        console.log(`POST request to ${url} with options:`, options);
        if (options?.data) {
            console.log("Request data:", JSON.stringify(options.data));
        }
        return await this._requestContext.post(url, options);
    }

    async put(url: string, options?: RestClientRequestOptions) {
        console.log(`PUT request to ${url} with options:`, options);
        if (options?.data) {
            console.log("Request data:", JSON.stringify(options.data));
        }
        return await this._requestContext.put(url, options);
    }

    async delete(url: string, options?: RestClientRequestOptions) {
        console.log(`DELETE request to ${url} with options:`, options);
        return await this._requestContext.delete(url, options);
    }

    async patch(url: string, options?: RestClientRequestOptions) {
        console.log(`PATCH request to ${url} with options:`, options);
        if (options?.data) {
            console.log("Request data:", JSON.stringify(options.data));
        }
        return await this._requestContext.patch(url, options);
    }

    async disposeClient() {
        await this._requestContext.dispose();
        console.log("RestClient disposed");
    }
}