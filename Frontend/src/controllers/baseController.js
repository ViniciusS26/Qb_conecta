import { API_URL } from "@/config";
import qs from "qs"; // Certifique-se de instalar via `npm install qs`

export class BaseController {
  static refreshingTokens = false;
  static refreshTokensPromise = null;

  constructor(userStore) {
    this.UserStore = userStore;
    
    // Garantir que sempre use HTTPS
    let baseUrl = "https://sistema-da-associacao.onrender.com";
    
    // Se houver uma variável de ambiente, use ela mas force HTTPS
    if (import.meta.env.VITE_API_URL) {
      baseUrl = import.meta.env.VITE_API_URL;
      // Força HTTPS se a URL estiver usando HTTP
      if (baseUrl.startsWith('http://')) {
        baseUrl = baseUrl.replace('http://', 'https://');
        console.warn('Forçando HTTPS para a API URL:', baseUrl);
      }
    }
    
    this.url = baseUrl;

  }

  urlFull(uri) {
    const fullUrl = `${this.url}${uri}`;
    
    // Verificação extra: se a URL completa ainda estiver usando HTTP, force HTTPS
    if (fullUrl.startsWith('http://')) {
      const httpsUrl = fullUrl.replace('http://', 'https://');
      console.warn('Forçando HTTPS para a URL completa:', httpsUrl);
      return httpsUrl;
    }
    
    return fullUrl;
  }

  getHeaders(isForm = false) {
    const headers = {
      Accept: "application/json",
    };

    if (isForm) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else {
      headers["Content-Type"] = "application/json; charset=utf-8";
    }

    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  async _sendRequest(uri, method, body = null, retry = null, isForm = false) {
    const url = this.urlFull(uri);
    const options = {
      method,
      headers: this.getHeaders(isForm),
    };

    if (body && !["GET", "HEAD"].includes(method)) {
      options.body = isForm ? qs.stringify(body) : JSON.stringify(body);
    }

    // Log detalhado para debug

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        // Log da resposta de erro
        const errorText = await response.text();
        console.error('Erro HTTP:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
          url: url,
          method: method
        });
        
        // Tenta fazer o parse do JSON para ver se há detalhes específicos
        try {
          const errorJson = JSON.parse(errorText);
          console.error('Detalhes do erro:', errorJson);
        } catch (jsonError) {
          console.error('Erro não é JSON válido:', errorText);
        }
        
        const error = new Error("HTTP Error");
        error.response = response;
        error.responseText = errorText;
        error.status = response.status;
        error.statusText = response.statusText;
        throw error;
      }

      const bodyText = await response.text();
      const json = bodyText ? JSON.parse(bodyText) : {};

      return {
        body: json,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      const retryInfo = retry || [uri, method, body, isForm];

      // Check for CORS error - melhor detecção
      if (error.name === 'TypeError' && (
        error.message.includes('Failed to fetch') ||
        error.message.includes('NetworkError') ||
        error.message.includes('CORS')
      )) {
        console.error('CORS Error Details:', {
          url: url,
          method: method,
          headers: options.headers,
          error: error.message
        });
        
        const corsError = new Error(`CORS Error: O servidor backend (${this.url}) precisa configurar as políticas CORS para permitir requisições do domínio ${window.location.origin}`);
        corsError.isCorsError = true;
        throw corsError;
      }

      if (error.response) {
        const response = error.response;
        const bodyText = await response.text();
        const json = bodyText ? JSON.parse(bodyText) : {};

        if (
          json?.message === "Please authenticate" &&
          uri !== "/auth/refresh-tokens"
        ) {
          if (!BaseController.refreshingTokens) {
            BaseController.refreshTokensPromise = this.refreshTokens();
            BaseController.refreshingTokens = true;
          }

          await BaseController.refreshTokensPromise;
          BaseController.refreshingTokens = false;

          return await this._sendRequest(
            retryInfo[0],
            retryInfo[1],
            retryInfo[2],
            retryInfo,
            retryInfo[3]
          );
        }

        throw {
          body: json,
          status: response.status,
          statusText: response.statusText,
        };
      }

      console.error("Erro inesperado:", error);
      throw error;
    }
  }

  async _get(uri) {
    return this._sendRequest(uri, "GET");
  }

  async _post(uri, body, isForm = false) {
		return this._sendRequest(uri, "POST", body, null, isForm);
	}
  async _delete(uri, body) {
    return this._sendRequest(uri, "DELETE", body);
  }

  async _put(uri, body) {
    return this._sendRequest(uri, "PUT", body);
  }

  async _patch(uri, body) {
    return this._sendRequest(uri, "PATCH", body);
  }

  async refreshTokens() {
    try {
      const token = localStorage.getItem("refresh-token");
      if (!token) return;

      const response = await this._post("/auth/refresh-tokens", { token });

      if (response?.body?.tokens) {
        this.UserStore.setToken(response.body.tokens);
      }

      return response;
    } catch (error) {
      if (error.body?.message === "Please authenticate") {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh-token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
      throw error;
    }
  }
}

export default BaseController;