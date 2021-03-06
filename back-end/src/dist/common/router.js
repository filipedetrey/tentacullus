"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Router extends events_1.EventEmitter {
    envelope(document) {
        return document;
    }
    envelopeAll(documents, options = {}) {
        return documents;
    }
    render(response, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document);
                response.json(this.envelope(document));
            }
            else {
                response.send(404);
            }
            return next();
        };
    }
    renderDocument(response, next, document) {
        if (document) {
            this.emit('beforeRender', document);
            response.json(this.envelope(document));
        }
        else {
            response.send(404);
        }
        return next();
    }
    renderAll(response, next, options = {}) {
        return (documents) => {
            if (documents) {
                documents.forEach((document, index, array) => {
                    array[index] = this.envelope(document);
                    this.emit('beforeRender', document);
                });
                response.json(this.envelopeAll(documents, options));
            }
            else {
                response.json(this.envelopeAll([]));
            }
        };
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map