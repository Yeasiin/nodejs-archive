import JWT from "jsonwebtoken";

export function generateToken(payload: { _id: string }) {
  return JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
}
