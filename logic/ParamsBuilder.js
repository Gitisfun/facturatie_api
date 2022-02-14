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
        let paramList = []
        for(let i = 0; i < 12; i++){
            paramList.push(req.bedrijf_id)
            paramList.push(req.body.year)
        } 
        return paramList
    }

    static rangeStartAndEnd(req){
        let paramList = []
        for(let i = 0; i < req.body.length; i++){
            paramList.push(req.bedrijf_id)
            paramList.push(req.body[i].start_date)
            paramList.push(req.body[i].end_date)
        } 
        return paramList
    }

}


export default ParamsBuilder