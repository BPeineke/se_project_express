const { NODE_ENV, JWT_SECRET } = process.env;

if (NODE_ENV === "production" && !JWT_SECRET?.trim()) {
  throw new Error("JWT_SECRET is required in production");
}

module.exports = { JWT_SECRET: JWT_SECRET || "development-jwt-secret" };
