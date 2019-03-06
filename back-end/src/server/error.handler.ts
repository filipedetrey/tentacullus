import * as restify from 'restify'
import { remakeString } from '../common/functions';

export const handleError = (req: restify.Request, resp: restify.Response, err, done) => {
  err.toJSON = () => {
    return {
      message: err.message
    }
  }
  switch (err.name) {
    case 'MongoError':
      if (err.code === 11000) {
        err.statusCode = 400
      }
      break
    case 'ValidationError':
      err.statusCode = 400
      let errors: any = {}
      for (let name in err.errors) {

        let message;
        if (err.errors[name].kind === 'unique')
          message = remakeString(err.errors[name].path) + " " + err.errors[name].message
        else message = err.errors[name].message

        errors[name] = {
          message,
          path: err.errors[name].path,
          kind: err.errors[name].kind,
          value: err.errors[name].value
        }
      }
      err.toJSON = () => (errors)
      break
  }
  done()
}