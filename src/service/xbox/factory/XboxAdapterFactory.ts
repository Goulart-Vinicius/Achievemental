import { Axios } from "axios";
import type { IXboxApiAdapter } from "../interface/IXboxApiAdapter";
import { OpenXBLAdapter } from "../adapter/OpenXBLAdapter";
import type { ProviderType } from "../interface/XboxProviderType";

export class XboxAdapterFactory {
  static createAdapter(type: ProviderType): IXboxApiAdapter {
    switch (type) {
      case "OPEN_XBL":
        const axiosClient = new Axios();
        return new OpenXBLAdapter(axiosClient);
      default:
        throw new Error(`Provider do tipo ${type} não é suportado.`);
    }
  }
}
