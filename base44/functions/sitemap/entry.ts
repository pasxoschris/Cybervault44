Deno.serve(async (req) => {
  const baseUrl = "https://cyber-vault.gr";

  const pages = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
    { loc: "/services", priority: "0.9", changefreq: "monthly" },
    { loc: "/contact", priority: "0.8", changefreq: "monthly" },
  ];

  const urls = pages.map(({ loc, priority, changefreq }) => `
  <url>
    <loc>${baseUrl}${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
});