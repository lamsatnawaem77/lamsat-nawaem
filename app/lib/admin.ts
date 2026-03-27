export const ADMIN_EMAIL = "lamsatnawaem77@gmail.com";

export function isAdminEmail(email?: string | null) {
  return email === ADMIN_EMAIL;
}