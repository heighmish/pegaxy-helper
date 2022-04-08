import React, { useState, useEffect } from 'react';


const PegaCard = ({id, bloodLine, breedCount, breedType, canBreedAt, canRaceAt, gender, winRate, gold, silver, bronze, totalRaces, motherId, fatherId, predictedVis, speed, strength, lightning, wind, water, fire}) => {
    const [avgVis, setAvgVis] = useState('');
    useEffect(() => {
        const val = (gold/totalRaces) * 105 + (silver/totalRaces) * 44 + (bronze/totalRaces)* 26;
        setAvgVis(val);
    }, [bronze, gold, silver, totalRaces])
    return (
        <div>
            {id}, Actual vis: {avgVis.toFixed(3)}, Expected vis: {predictedVis} 
            <div>
                {speed}, {strength},.{lightning}, {wind}, {water}, {fire}
            </div>
        </div>
    );
}

export default PegaCard;