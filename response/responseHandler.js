export default function responseHandler(err, results, res, next) {
    if (err) { next(err) }
    else { res.send(results) }
}