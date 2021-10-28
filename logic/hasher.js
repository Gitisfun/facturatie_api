import bcrypt from "bcrypt"

export default function hasher(body, query, paramList, responser, res, next) {
    bcrypt.hash(body.wachtwoord, 10, function (err, hash) {
        if (err) { next(err) }
        else {  
            paramList.unshift(hash)
            responser(query, paramList, res, next);
        }
    });
}