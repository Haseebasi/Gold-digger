import http from 'node:http'
import { handlePost } from './handlers/routehandlers.js'
import { serveStatic } from './utils/serveStatic.js'
import { getPrice } from './utils/getPrice.js'


const PORT = 8000
const __dirname = import.meta.dirname
const server = http.createServer(async (req,res)=>{
    if (req.url.startsWith( '/api/live')) {
        res.statusCode = 200
    res.setHeader('content-type','text/event-stream')
    res.setHeader('Cache-control','no-cache')
    res.setHeader('connection','keep-alive')
    setInterval(()=>{
        const price = getPrice()
        res.write(
            `data:${JSON.stringify({event:'price-updated',price:price})}\n\n`
        )
    },15000)
    } 
    else if (req.url === "/api/invest" && req.method === "POST"){
        handlePost(req,res)
    }
    else if (!req.url.startsWith('/api')) {
        return await serveStatic(req, res, __dirname)
    }
}
)
server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))


