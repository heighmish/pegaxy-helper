export const calculateAvgVis = (gold, silver, bronze, totalRaces, breedType) => {
    const oldAvgVis = (gold/totalRaces) * 105 + (silver/totalRaces) * 44 + (bronze/totalRaces)* 26;
    if (!oldAvgVis) return 0;
    return modulateAvgVis(oldAvgVis, breedType);
}

export const modulateAvgVis = (oldAvgVis, breedType) => {
    switch (breedType) {
        case 'Pacer':
            return oldAvgVis * (1 - 0.75);
        case 'Rare':
            return oldAvgVis * (1 - 0.43);
        case 'Epic':
            return oldAvgVis * (1 + 0.29);
        case 'Legendary':
            return oldAvgVis * (1 + 1.85);
        case 'Founding':
            return oldAvgVis * (1 + 1.85);
        default:
            // bad input
            return -1;
    }
}

export const getMetaScore = (prediction) => {
    const quantiles = [
        5.90823984, 
        8.63604927, 
        9.31120453, 
        9.91413383,
        10.50946388,
        11.49509792,
        12.87348022,
        14.36807671,
        17.15586357,
        20.01042976,
        24.84795746,
    ]
    const quantValue = quantiles.reduce((prev, curr) => Math.abs(curr - prediction) < Math.abs(prev - prediction) ? curr : prev);
    return quantiles.findIndex((val) => val === quantValue);
}