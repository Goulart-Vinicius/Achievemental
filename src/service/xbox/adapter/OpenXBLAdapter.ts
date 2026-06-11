import type { IXboxApiAdapter } from "../interface/IXboxApiAdapter";
import { Axios } from "axios";

const OPEN_XBL_API_BASE_URL = "https://api.xbl.io/v2/";

interface IOpenXBLErrorPayload {
  code: string;
  message: string;
}

export class OpenXBLAdapter implements IXboxApiAdapter {
  private readonly apiClient: Axios;
  private readonly apiKey: string;

  constructor(apiClient: Axios) {
    this.apiClient = apiClient;
    this.apiKey = import.meta.env.VITE_OPEN_XBL_API_KEY || "";
  }

  async getPlayerAchievements(uid: string): Promise<any> {
    const headers = {
      "X-Authorization": this.apiKey,
    };

    const encodedXuid = encodeURIComponent(uid);

    const url = `${OPEN_XBL_API_BASE_URL}/achievements/player/${encodedXuid}`;

    const encodedUrl = encodeURI(url);

    try {
      const response = await this.apiClient.get(encodedUrl, { headers });

      return response.data;
    } catch (error: any) {
      if (error.response) {
        const axiosErrorData: IOpenXBLErrorPayload = error.response.data;

        console.error("Status do erro:", error.response.status);
        console.error("Dados do erro:", axiosErrorData);
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta (ex: internet caiu, API offline)
        console.error("Sem resposta do servidor:", error.request);
      } else {
        console.error("Erro interno:", error.message);
      }
    }
  }
}
