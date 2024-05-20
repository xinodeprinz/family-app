import { signupSchema } from "@/components/schemas";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = await signupSchema.validateAsync(req.body);
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password as string, salt);
      const user = await prisma.user.create({ data });
      const { password, ...rest } = user;
      const access_token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "6h" }
      );
      return res
        .status(200)
        .json({ message: "Sign up successful", access_token, user: rest });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
