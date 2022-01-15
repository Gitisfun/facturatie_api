export default function errorHandler(err, next) {
    if (err) { console.log(err); next(err) } // TODO: Console log weghalen in productie
}