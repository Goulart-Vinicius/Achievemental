import { XboxAdapterFactory } from "../factory/XboxAdapterFactory";
import type { IXboxApiAdapter } from "../interface/IXboxApiAdapter";
import type { ProviderType } from "../interface/XboxProviderType";

export class XboxFacade {
  private xboxApiAdapter: IXboxApiAdapter;

  constructor() {
    this.xboxApiAdapter = XboxAdapterFactory.createAdapter(
      process.env.XBOX_PROVIDER as ProviderType,
    );
  }

  async getPlayerAchievements(uid: string): Promise<any> {
    return this.xboxApiAdapter.getPlayerAchievements(uid);
  }
}
