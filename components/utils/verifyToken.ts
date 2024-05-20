import { NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import type { CustomRequest } from "@/types";

export const verifyToken =
  (handler: any) => async (req: CustomRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decodedToken = verify(token, process.env.JWT_SECRET as string) as {
        userId: number;
      };
      req.userId = decodedToken.userId;
      return handler(req, res);
    } catch (error) {
      console.error("Error during token verification:", error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };

export default verifyToken;
