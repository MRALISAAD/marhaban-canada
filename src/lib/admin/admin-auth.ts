export async function verifyAdminPassword(
  password: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = (await res.json()) as { ok: boolean; error?: string };
    return data;
  } catch {
    return { ok: false, error: 'Erreur réseau. Réessayez.' };
  }
}
