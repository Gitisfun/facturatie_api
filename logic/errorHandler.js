export default function errorHandler(err) {
    if (err) { console.log(err); next(err) } // TODO: Console log weghalen in productie
}