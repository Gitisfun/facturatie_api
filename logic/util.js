class Bulk {
    static createArtikels(list, IDs){
        let result = []

        for(let i = 0; i < list.length; i++) {
            let temp = []

            temp.push(list[i].artikelcode)
            temp.push(list[i].naam)
            temp.push(list[i].prijs)
            temp.push(list[i].memo)
            temp.push(list[i].hoeveelheid)
            temp.push(list[i].korting_een)
            temp.push(list[i].korting_twee)
            temp.push(list[i].totaal)
            temp.push(IDs.factuur_id)
            temp.push(IDs.bedrijf_id)
            
            result.push(temp)
        }

        return result
    }
}

export default Bulk