// Deno Hello World — native HTTP server
// Uses Deno.serve(), the built-in HTTP server API (Deno 1.35+)

const port = 8000;

const handler = (req: Request): Response => {
  const url = new URL(req.url);
  const name = url.searchParams.get("name") ?? "World";

  const body = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Deno 🦕 Hello</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      color: #1e293b;
    }
    main { text-align: center; }
    h1 { font-size: 4rem; font-weight: 800; }
    h1 span { background: linear-gradient(135deg, #15803d, #10b981); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { margin-top: 1rem; font-size: 1.25rem; color: #475569; }
    .badge {
      display: inline-block;
      margin-top: 2rem;
      padding: 0.5rem 1.25rem;
      border-radius: 9999px;
      background: #1e293b;
      color: #f8fafc;
      font-size: 0.875rem;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <main>
    <h1>Hello, <span>${escapeHtml(name)}</span>!</h1>
    <p>This is a <strong>Deno</strong> native HTTP server 🦕</p>
    <div class="badge">Deno ${Deno.version.deno} · ${req.method} ${url.pathname}</div>
  </main>
</body>
</html>`;

  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

console.log(`🦕 Deno server listening on http://localhost:${port}`);
Deno.serve({ port }, handler);
