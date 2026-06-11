export interface IXboxApiAdapter {
  getPlayerAchievements(uid: string): Promise<any>;
}
