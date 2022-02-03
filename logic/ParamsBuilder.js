class ParamsBuilder{
    
    static range(req){
        let paramList = []
        for(let i = 0; i < req.body.length; i++){
            paramList.push(req.bedrijf_id)
            paramList.push(req.body[i])
        } 
        return paramList
    }

    static rangeMonths(req){
        console.log(req.body.year);
        let paramList = []
        for(let i = 0; i < 12; i++){
            paramList.push(req.bedrijf_id)
            paramList.push(req.body.year)
        } 
        return paramList
    }

}


export default ParamsBuilder