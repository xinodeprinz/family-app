import { addSchema } from "@/components/schemas";
import { verifyToken } from "@/components/utils";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data = await addSchema.validateAsync(req.body);
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password as string, salt);
      const user = await prisma.user.create({ data });

      return res.status(200).json({ message: "Member added successfully" });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
};

export default verifyToken(handler);
