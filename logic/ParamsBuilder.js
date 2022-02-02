class ParamsBuilder{
    
    static range(req){
        let paramList = []
        for(let i = 0; i < req.body.length; i++){
            paramList.push(req.bedrijf_id)
            paramList.push(req.body[i])
        } 
        return paramList
    }

}

export default ParamsBuilder