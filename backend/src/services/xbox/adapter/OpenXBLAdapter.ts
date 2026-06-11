import { AppError } from "../../../errors/AppError";
import type { IXboxApiAdapter } from "../interface/IXboxApiAdapter";
import { Axios } from "axios";

const OPEN_XBL_API_BASE_URL = "https://api.xbl.io/v2";

export interface IOpenXBLErrorPayload {
  code: string;
  message: string;
}

export class OpenXBLAdapter implements IXboxApiAdapter {
  private readonly apiClient: Axios;
  private readonly apiKey: string;

  constructor(apiClient: Axios) {
    this.apiClient = apiClient;
    this.apiKey = process.env.OPEN_XBL_API_KEY || "";
  }

  private verifyError(statusCode: number, details?: IOpenXBLErrorPayload) {
    switch (statusCode) {
      case 400:
        throw new AppError<IOpenXBLErrorPayload>(
          "Requisição inválida para a API do Xbox (Parâmetros incorretos, malformados ou inválidos)",
          400,
          details,
        );
      case 401:
        throw new AppError<IOpenXBLErrorPayload>(
          "Erro de autenticação com a API do Xbox (Chave de API inválida ou ausente)",
          401,
          details,
        );
      case 404:
        throw new AppError<IOpenXBLErrorPayload>(
          "Recurso não encontrado na API do Xbox",
          404,
          details,
        );
      case 429:
        throw new AppError<IOpenXBLErrorPayload>(
          "Limite de requisições excedido para a API do Xbox (Rate limit)",
          429,
          details,
        );
      default:
        if (statusCode < 200 || statusCode >= 300) {
          throw new AppError<IOpenXBLErrorPayload>(
            `Falha inesperada do Xbox: ${statusCode}`,
            statusCode,
            details,
          );
        }
    }
  }

  async getPlayerAchievements(uid: string): Promise<any> {
    const encodedXuid = encodeURIComponent(uid);
    const url = `${OPEN_XBL_API_BASE_URL}/achievements/player/${encodedXuid}`;

    const encodedUrl = encodeURI(url);

    const headers = {
      "X-Authorization": this.apiKey,
    };

    const options = {
      method: "GET",
      url: encodedUrl,
      headers,
    };

    try {
      const response = await this.apiClient.request(options);

      const parsedData =
        typeof response.data === "string" ?
          JSON.parse(response.data)
        : response.data;

      this.verifyError(response.status, parsedData);

      if (parsedData?.code) {
        this.verifyError(parsedData.code, parsedData);
      }

      return parsedData;
    } catch (error: any) {
      if (error.response) {
        this.verifyError(error.response.status, error.response.data);
      } else if (error.request) {
        throw new AppError<IOpenXBLErrorPayload>(
          `Sem resposta da API do Xbox (Servidor pode estar offline)`,
          503,
          error.request,
        );
      }

      throw error;
    }
  }
}
