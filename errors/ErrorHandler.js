import ApiError from "./ApiError.js"
// import logger from "../console/logger.js"

function errorHandler(err, req, res, next) {

    if (err instanceof ApiError) {
        res.status(err.code).json(err.message)
        return;
    }

    res.status(500).json('Something went wrong on the server')
}

export default errorHandler