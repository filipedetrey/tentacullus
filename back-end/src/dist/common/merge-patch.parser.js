"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contentType = "application/merge-patch+json";
exports.mergePatchBodyParser = (req, resp, next) => {
    if (req.getContentType() === contentType && req.method === "PATCH") {
        try {
            req.body = JSON.parse(req.body);
        }
        catch (e) {
            return next(new Error(`Erro ${e}`));
        }
    }
    return next();
};
//# sourceMappingURL=merge-patch.parser.js.map