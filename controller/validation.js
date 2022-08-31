const {Validator , ValidationError} = require('jsonschema');
const uschema = require('../schema/userauth.schema')

const v = new Validator()

exports.validateArticle = async(ctx, next) => {
  const validationOptions = {
    throwError: true,
    allowUnkonwnAttributes: false
  }
  const body = ctx.request.body
  try {
    v.validate(body, uschema, validationOptions)
    await next()
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.body = error
      ctx.status = 400
    } else {
      throw error
    }
  }
}
