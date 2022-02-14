export default function errorHandler(err, next) {
    if (err) { next(err) }
}