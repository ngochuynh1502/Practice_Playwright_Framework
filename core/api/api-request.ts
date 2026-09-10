export interface APIHeader {
    [headers: string | number | symbol]: unknown;
}

export interface APIRequest {
    header?: APIHeader;
    data?: unknown;
    params?: Record<string, string>;
}
export interface AuthorizationHeader {
    token?: string;
    username?: string;
    password?: string;
}

export class APIRequestBuilder {
    private readonly _apiRequest: APIRequest;

    constructor() {
        this._apiRequest = {};
        this._apiRequest.header = {};
    }

    build() {
        return this._apiRequest;
    }

    addContentTypeHeader(contentType: string): APIRequestBuilder {
        this._apiRequest.header!['Content-Type'] = contentType;
        return this;
    }

    addAcceptTypeHeader(acceptType: string): APIRequestBuilder {
        this._apiRequest.header!['Accept'] = acceptType;
        return this;
    }

    addJsonHeaders() {
        return this
            .addContentTypeHeader("application/json")
            .addAcceptTypeHeader("application/json");
    }

    addQueryParam(key: string, value: string): this {
        this._apiRequest.params![key] = value;
        return this;
    }

    addAuthorizationHeader(authorizationType: 'BEARER' | 'BASIC', options: AuthorizationHeader): APIRequestBuilder {
        switch (authorizationType.toUpperCase()) {
            case 'BEARER':
                if (!options.token) throw new Error("Missing token for Bearer auth");
                this.addBearerAuthorizationHeader(options.token);
                break;
            case 'BASIC':
                if (!options.username || !options.password) throw new Error("Missing username/password for Basic auth");
                this.addBasicAuthorizationHeader(options.username, options.password);
                break;
            default:
                throw new Error("Unsupported authorization type");
        }
        return this;
    }

    addBearerAuthorizationHeader(token: string): APIRequestBuilder {
        this._apiRequest.header!['Authorization'] = `Bearer ${token}`;
        return this;
    }

    addBasicAuthorizationHeader(username: string, password: string): APIRequestBuilder {
        const encoded = Buffer.from(`${username}:${password}`).toString('base64');
        this._apiRequest.header!['Authorization'] = `Basic ${encoded}`;
        return this;
    }

    addCustomHeader(headerName: string | number | symbol, headerValue: string | number | symbol): APIRequestBuilder {
        this._apiRequest.header![headerName] = headerValue;
        return this;
    }

    addAdditionalHeaders(additionalHeaders: Record<string | number | symbol, string | number | symbol>): APIRequestBuilder {
        Object.entries(additionalHeaders).forEach(([key, value]) => {
            this._apiRequest.header![key] = value;
        });
        return this;
    }

    addBearerTokenAuthorizationHeader(token: string): APIRequestBuilder {
        this._apiRequest.header!['Authorization'] = `Bearer ${token}`;
        return this;
    }

    addData(data: unknown): APIRequestBuilder {
        this._apiRequest.data = data;
        return this;
    }
}