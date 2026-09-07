import crypto from "crypto";

const COOKIE_NAME = "shopee_admin";

function secret() {
  return process.env.ADMIN_COOKIE_SECRET || "dev-secret-change-me";
}

export function signAdminCookie() {
  const payload = "admin";
  const sig = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyAdminCookie(value) {
  if (!value) return false;
  const [payload, sig] = value.split(".");
  if (payload !== "admin" || !sig) return false;
  const expected = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
