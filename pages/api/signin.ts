import { signinSchema } from "@/components/schemas";
import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = await signinSchema.validateAsync(req.body);
      const user = (await prisma.user.findUnique({
        where: { email: data.email },
      })) as User;
      if (!user) {
        return res.status(400).json({ message: "Invalid login credentials" });
      }
      const isPassword = await bcrypt.compare(data.password, user.password);
      if (!isPassword) {
        return res.status(400).json({ message: "Invalid login credentials" });
      }
      const { password, ...rest } = user;
      const access_token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "6h" }
      );
      return res
        .status(200)
        .json({ message: "Login successful", access_token, user: rest });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
