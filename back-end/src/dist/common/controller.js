"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const mongoose = require("mongoose");
const restify_errors_1 = require("restify-errors");
class Controller extends router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        this.validateId = (req, resp, next) => {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                next(new restify_errors_1.NotFoundError('Documento não encontrado.'));
            }
            else {
                next();
            }
        };
        this.findAll = (req, resp, next) => {
            if (req.query.paginate && Boolean(req.query.paginate)) {
                let page = parseInt(req.query.page || 1);
                page = page > 0 ? page : 1;
                let pageSize = parseInt(req.query.pageSize || 10);
                const skip = (page - 1) * pageSize;
                this.model.count({}).exec()
                    .then(total => this.prepareAll(this.model.find()
                    .skip(skip)
                    .limit(pageSize))
                    .then(this.renderAll(resp, next, { page, pageSize, skip, total, url: req.url })))
                    .catch(next);
            }
            else {
                this.prepareAll(this.model.find())
                    .then(this.renderAll(resp, next, { url: req.url }))
                    .catch(next);
            }
        };
        this.findById = (req, resp, next) => {
            this.prepareOne(this.model.findById(req.params.id))
                .then(this.render(resp, next))
                .catch(next);
        };
        this.save = (req, resp, next) => {
            let document = new this.model(req.body);
            document.save()
                .then(this.render(resp, next))
                .then(() => { this.emit('save'); })
                .catch(next);
        };
        this.replace = (req, resp, next) => {
            const options = { runValidators: true, overwrite: true, context: 'query' };
            this.model.update({ _id: req.params.id }, req.body, options)
                .exec().then((result) => {
                if (result.n) {
                    return this.prepareOne(this.model.findById(req.params.id));
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                }
            })
                .then(this.render(resp, next))
                .then(() => { this.emit('replace'); })
                .catch(next);
        };
        this.update = (req, resp, next) => {
            const options = { runValidators: true, new: true, context: 'query' };
            this.model.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp, next))
                .then(() => { this.emit('update'); })
                .catch(next);
        };
        this.delete = (req, resp, next) => {
            this.model.remove({ _id: req.params.id }).exec().then((cmdResult) => {
                if (cmdResult.n) {
                    resp.send(204);
                    this.emit('delete');
                }
                else {
                    return next(new restify_errors_1.NotFoundError('Documento não encontrado.'));
                }
                return next();
            })
                .catch(next);
        };
        this.basePath = `/${model.collection.name}`;
        this.collectionName = `${model.collection.name}`;
    }
    applyWebsockets(io) {
        this.on('save', () => {
            io.emit(this.collectionName);
        });
        this.on('update', () => {
            io.emit(this.collectionName);
        });
        this.on('replace', () => {
            io.emit(this.collectionName);
        });
        this.on('delete', () => {
            io.emit(this.collectionName);
        });
    }
    prepareOne(query) {
        return query;
    }
    prepareAll(query) {
        return query;
    }
    envelope(document) {
        let resource = Object.assign({ _links: {} }, document.toJSON());
        resource._links.self = `${this.basePath}/${resource._id}`;
        return resource;
    }
    envelopeAll(documents, options = {}) {
        let resource = {
            items: documents,
            _links: {
                self: `${options.url}`
            }
        };
        if (options.page && options.total && options.pageSize) {
            const remaining = options.total - (options.page * options.pageSize);
            const lastPage = (options.total + options.pageSize - 1) / options.pageSize;
            resource._links.first = `${options.url}&page=1`;
            resource._links.last = `${options.url}&page=${parseInt(String(lastPage))}`;
            if (options.page > 1) {
                resource._links.prev = `${options.url}&page=${options.page - 1}`;
            }
            if (remaining > 0) {
                resource._links.next = `${options.url}&page=${options.page + 1}`;
            }
        }
        return resource;
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map