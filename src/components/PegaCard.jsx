import React, { useState, useEffect } from 'react';


const PegaCard = ({id, bloodLine, breedCount, breedType, canBreedAt, canRaceAt, gender, winRate, gold, silver, bronze, totalRaces, motherId, fatherId, predictedVis, speed, strength, lightning, wind, water, fire}) => {
    const [avgVis, setAvgVis] = useState(0);
    useEffect(() => {
        const val = (gold/totalRaces) * 105 + (silver/totalRaces) * 44 + (bronze/totalRaces)* 26;
        setAvgVis(Number(val));
    }, [bronze, gold, silver, totalRaces])
    return (
        <div>
            {id}, Actual vis: {avgVis.toFixed(2)}, Expected vis: {predictedVis.toFixed(2)} 
            <div>
                {speed}, {strength},.{lightning}, {wind}, {water}, {fire}
            </div>
        </div>
    );
}

export default PegaCard;