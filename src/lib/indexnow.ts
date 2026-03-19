const INDEXNOW_KEY = "e3e045fe-7ce8-4b36-97b3-9c3e6de4a85f";
const SITE_HOST = "dealforge.es";
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`;

/**
 * Notify search engines (Bing, Yandex, Seznam, Naver) about new/updated URLs
 * via the IndexNow protocol.
 */
export async function notifyIndexNow(urls: string[]): Promise<{ success: boolean; errors: string[] }> {
  if (urls.length === 0) return { success: true, errors: [] };

  // Ensure all URLs are absolute
  const absoluteUrls = urls.map((u) =>
    u.startsWith("http") ? u : `https://${SITE_HOST}${u.startsWith("/") ? "" : "/"}${u}`
  );

  const body = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: absoluteUrls,
  };

  const engines = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
  ];

  const errors: string[] = [];

  await Promise.allSettled(
    engines.map(async (engine) => {
      try {
        const res = await fetch(engine, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(body),
        });
        if (!res.ok && res.status !== 202) {
          errors.push(`${engine}: ${res.status}`);
        }
      } catch (err) {
        errors.push(`${engine}: ${err instanceof Error ? err.message : "failed"}`);
      }
    })
  );

  return { success: errors.length === 0, errors };
}

/**
 * Get all public URLs that should be indexed.
 */
export function getAllPublicUrls(): string[] {
  return [
    "/",
    "/guia",
    "/contacto",
    "/blog",
    "/documentacion",
    "/changelog",
    "/privacidad",
    "/terminos",
    "/rgpd",
  ];
}
