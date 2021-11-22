export default function responseHandler(err, results, res, next) {
    if (err) { console.log(err); next(err) } // TODO: Console log weghalen in productie
    else { /*console.log(results);*/ res.send(results) }
}