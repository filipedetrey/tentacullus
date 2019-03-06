import * as restify from 'restify'

const contentType = "application/merge-patch+json"

export const mergePatchBodyParser = (req: restify.Request, resp: restify.Response, next) => {
    if (req.getContentType() === contentType && req.method === "PATCH") {
        try {
            req.body = JSON.parse(req.body)
        } catch (e) {
            return next(new Error(`Erro ${e}`))
        }
    }
    return next()
}