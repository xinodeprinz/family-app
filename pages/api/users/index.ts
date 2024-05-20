import { verifyToken } from "@/components/utils";
import prisma from "@/prisma/client";
import type { CustomRequest } from "@/types";
import type { NextApiResponse } from "next";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const users = (await prisma.user.findMany()) as any;
    for await (const user of users) {
      if (user.mother_id) {
        user.mother = await prisma.user.findUnique({
          where: { id: user.mother_id },
        });
      }
      if (user.father_id) {
        user.father = await prisma.user.findUnique({
          where: { id: user.father_id },
        });
      }
    }
    return res.status(200).json(users);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
};

export default verifyToken(handler);
