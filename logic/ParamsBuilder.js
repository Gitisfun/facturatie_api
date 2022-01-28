class ParamsBuilder{
    
    static range(req){
        let paramList = []
        for(let i = 0; i < req.body.list.length; i++){
            paramList.push(req.bedrijf_id)
            paramList.push(req.body.list[i])
        } 
        return paramList
    }

}

export default ParamsBuilder