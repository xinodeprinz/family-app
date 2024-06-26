import { verifyToken } from "@/components/utils";
import prisma from "@/prisma/client";
import type { CustomRequest } from "@/types";
import type { NextApiResponse } from "next";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const id = parseInt(req.query.id as string);
    await prisma.user.delete({ where: { id } });
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
};

export default verifyToken(handler);
