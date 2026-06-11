import express, {
  type Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { XboxFacade } from "../services/xbox/facade/XboxFacade";
import { AppError } from "../errors/AppError";

const router: Router = express.Router();

router.get(
  "/achievements",
  async (req: Request, res: Response, next: NextFunction) => {
    const { xuid } = req.query as { xuid: string };

    if (!xuid) {
      throw new AppError(
        "Parâmetro 'xuid' é obrigatório para obter conquistas do jogador",
        400,
      );
    }

    const xboxFacade = new XboxFacade();

    const achievements = await xboxFacade.getPlayerAchievements(xuid);

    res.status(200).json({
      title: "achievements",
      achievements,
    });
  },
);

export default router;
