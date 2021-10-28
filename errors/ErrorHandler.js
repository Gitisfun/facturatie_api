import ApiError from "./ApiError.js"
// import logger from "../console/logger.js"

function errorHandler(err, req, res, next) {

    // TODO: In production don't use console.log because it's not async
    // console.log(logger.error(`[ERROR]\t\t\t[${err.code}]\t\t${err.message}`))

    if (err instanceof ApiError) {
        res.status(err.code).json(err.message)
        return;
    }

    res.status(500).json('Something went wrong on the server')
}

export default errorHandler