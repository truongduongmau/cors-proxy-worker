export default {
  async fetch(request) {

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Cache-Control": "no-store"
    }

    // xử lý preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      })
    }

    const url = new URL(request.url)
    const target = url.searchParams.get("url")

    if (!target) {
      return new Response("Missing url param", {
        status: 400,
        headers: corsHeaders
      })
    }

    const response = await fetch(target, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      cf: { cacheTtl: 0 }
    })

    const headers = new Headers(response.headers)

    Object.entries(corsHeaders).forEach(([k, v]) => {
      headers.set(k, v)
    })

    return new Response(response.body, {
      status: response.status,
      headers
    })
  }
}
