export default {
  async fetch(request) {

    const url = new URL(request.url)
    const target = url.searchParams.get("url")

    if (!target) {
      return new Response("Missing url param", { status: 400 })
    }

    const apiResponse = await fetch(target, {
      method: request.method,
      headers: request.headers,
      body: request.body
    })

    const newHeaders = new Headers(apiResponse.headers)

    newHeaders.set("Access-Control-Allow-Origin", "*")
    newHeaders.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    newHeaders.set("Access-Control-Allow-Headers", "*")

    return new Response(apiResponse.body, {
      status: apiResponse.status,
      headers: newHeaders
    })
  }
}
