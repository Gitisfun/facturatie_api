export default function responseHandler(err, results, res, next) {
    if (err) { console.log(err); next(err) } // Console.log weghalen
    else { res.send(results) }
}