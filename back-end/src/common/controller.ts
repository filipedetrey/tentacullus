import { Router } from './router'
import * as mongoose from 'mongoose'
import * as io from 'socket.io'
import { NotFoundError } from 'restify-errors'

export abstract class Controller<D extends mongoose.Document> extends Router {

    protected basePath: string
    protected collectionName: string

    constructor(protected model: mongoose.Model<D>) {
        super()
        this.basePath = `/${model.collection.name}`
        this.collectionName = `${model.collection.name}`
    }

    applyWebsockets(io: io.Server) {
        this.on('save', () => {
            io.emit(this.collectionName)
        })
        this.on('update', () => {
            io.emit(this.collectionName)
        })
        this.on('replace', () => {
            io.emit(this.collectionName)
        })
        this.on('delete', () => {
            io.emit(this.collectionName)
        })
    }

    protected prepareOne(query: mongoose.DocumentQuery<D, D>): mongoose.DocumentQuery<D, D> {
        return query
    }

    protected prepareAll(query: mongoose.DocumentQuery<D[], D>): mongoose.DocumentQuery<D[], D> {
        return query
    }

    envelope(document: any): any {
        let resource = Object.assign({ _links: {} }, document.toJSON())
        resource._links.self = `${this.basePath}/${resource._id}`
        return resource
    }

    envelopeAll(documents: any[], options: any = {}): any {
        let resource: any = {
            items: documents,
            _links: {
                self: `${options.url}`
            }
        }

        if (options.page && options.total && options.pageSize) {

            const remaining = options.total - (options.page * options.pageSize)
            const lastPage = (options.total + options.pageSize - 1) / options.pageSize
            resource._links.first = `${options.url}&page=1`
            resource._links.last = `${options.url}&page=${parseInt(String(lastPage))}`

            if (options.page > 1) {
                resource._links.prev = `${options.url}&page=${options.page - 1}`
            }

            if (remaining > 0) {
                resource._links.next = `${options.url}&page=${options.page + 1}`
            }

        }

        return resource
    }

    validateId = (req, resp, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            next(new NotFoundError('Documento não encontrado.'))
        } else {
            next()
        }
    }

    findAll = (req, resp, next) => {
        if (req.query.paginate && Boolean(req.query.paginate)) {
            let page = parseInt(req.query.page || 1)
            page = page > 0 ? page : 1

            let pageSize = parseInt(req.query.pageSize || 10)
            const skip = (page - 1) * pageSize

            this.model.count({}).exec()
                .then(total => this.prepareAll(
                    this.model.find()
                        .skip(skip)
                        .limit(pageSize)
                )
                    .then(this.renderAll(resp, next, { page, pageSize, skip, total, url: req.url }))

                )
                .catch(next)
        }
        else {
            this.prepareAll(this.model.find())
                .then(this.renderAll(resp, next, { url: req.url }))
                .catch(next)
        }
    }

    findById = (req, resp, next) => {
        this.prepareOne(this.model.findById(req.params.id))
            .then(this.render(resp, next))
            .catch(next)
    }

    save = (req, resp, next) => {
        let document = new this.model(req.body)
        document.save()
            .then(this.render(resp, next))
            .then(() => { this.emit('save') })
            .catch(next)
    }

    replace = (req, resp, next) => {
        const options = { runValidators: true, overwrite: true, context: 'query' }
        this.model.update({ _id: req.params.id }, req.body, options)
            .exec().then((result): any => {
                if (result.n) {
                    return this.prepareOne(this.model.findById(req.params.id))
                } else {
                    throw new NotFoundError('Documento não encontrado.')
                }
            })
            .then(this.render(resp, next))
            .then(() => { this.emit('replace') })
            .catch(next)
    }

    update = (req, resp, next) => {
        const options = { runValidators: true, new: true, context: 'query' }
        this.model.findByIdAndUpdate(req.params.id, req.body, options)
            .then(this.render(resp, next))
            .then(() => { this.emit('update') })
            .catch(next)
    }

    delete = (req, resp, next) => {
        this.model.remove({ _id: req.params.id }).exec().then((cmdResult: any) => {
            if (cmdResult.n) {
                resp.send(204)
                this.emit('delete')
            } else {
                return next(new NotFoundError('Documento não encontrado.'))
            }
            return next()
        })
            .catch(next)
    }

}