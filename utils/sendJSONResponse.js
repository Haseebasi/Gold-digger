export const sendJSONResponse = (res, statusCode,contentType,payload) => {
    res.setHeader('Content-Type', contentType)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.statusCode = statusCode
    res.end(JSON.stringify(payload))
}