// server/middlewares/VerifyToken.js
import auth from "../config/firebase-config.js";

export const VerifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodeValue = await auth.verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      return next();
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  } catch (e) {
    console.error("Token verification error:", e);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export const VerifySocketToken = async (socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("Unauthorized: No token provided"));
  }

  try {
    const decodeValue = await auth.verifyIdToken(token);

    if (decodeValue) {
      socket.user = decodeValue;
      return next();
    }
    return next(new Error("Unauthorized: Invalid token"));
  } catch (e) {
    console.error("Socket token verification error:", e);
    return next(new Error("Unauthorized: Invalid or expired token"));
  }
};
