import PegaCard from "../components/PegaCard"

export const createPegaCard = (pega, predicted, pid=undefined) => {
    return <PegaCard 
        key={pid ? pid : pega.id}
        id={pid ? pid : pega.id}
        name = {pega.name}
        bloodLine = {pega.bloodLine}
        breedCount = {pega.breedCount}
        breedType = {pega.breedType} 
        canBreedAt = {pega.canBreedAt} 
        canRaceAt = {pega.canRaceAt}
        energy = {pega.energy}
        gender = {pega.gender}
        winRate = {Number(pega.winRate)}
        gold= {Number(pega.gold)}
        silver= {Number(pega.silver)}
        bronze = {Number(pega.bronze)}
        totalRaces= {Number(pega.totalRaces)}
        motherId = {Number(pega.motherId)}
        fatherId = {Number(pega.fatherId)}
        speed = {pega.speed}
        strength = {pega.strength}
        lightning = {pega.lightning}
        wind = {pega.wind}
        water = {pega.water}
        fire = {pega.fire}
        predictedVis = {predicted}
        />
}