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