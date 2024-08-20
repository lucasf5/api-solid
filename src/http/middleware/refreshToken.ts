import { env } from "@/env";
import CustomError from "@/services/@errors/CustomError";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: string;
  email: string;
}

export const RefreshTokenController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { refreshToken } = request.cookies;

  if (!refreshToken) {
    throw new CustomError("No refresh token provided", 401);
  }

  try {
    const decoded = jwt.verify(refreshToken, env.JWT_SECRET) as DecodedToken;

    const newAccessToken = await reply.jwtSign(
      {
        userId: decoded.userId,
        email: decoded.email,
      },
      {
        expiresIn: "10m",
      }
    );

    reply.setCookie("token", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });

    reply.status(200).send({ accessToken: newAccessToken });
  } catch (err) {
    throw new CustomError("Invalid refresh token", 401);
  }
};
