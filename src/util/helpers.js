import * as tf from '@tensorflow/tfjs';
import { predictDataSet } from './model';

export const calculateAvgVis = (gold, silver, bronze, totalRaces, breedType) => {
    let vis;
    switch (breedType) {
        case 'Pacer':
            vis = (gold/totalRaces) * 42 + (silver/totalRaces) * 18 + (bronze/totalRaces)* 10;
            break;
        case 'Rare':
            vis =  (gold/totalRaces) * 126 + (silver/totalRaces) * 53 + (bronze/totalRaces)* 31;
            break;
        case 'Epic':
            vis =  (gold/totalRaces) * 342 + (silver/totalRaces) * 142 + (bronze/totalRaces)* 86;
            break;
        case 'Legendary':
            vis = (gold/totalRaces) * 930 + (silver/totalRaces) * 388 + (bronze/totalRaces)* 232;
            break;
        case 'Founding':
            vis = (gold/totalRaces) * 930 + (silver/totalRaces) * 388 + (bronze/totalRaces)* 232;
            break;
        default:
            // bad input
            return -1;
    }
    return vis || 0;
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

export const getStatsFromJson = (pega) => {
    return [
        pega.speed,
        pega.strength,
        pega.lightning,
        pega.wind,
        pega.water,
        pega.fire
    ]
}

const calculateChildVector = (vec1, vec2) => {
    let copy = [...vec2];
    for (let i = 0; i < vec1.length; ++i) {
        copy[i] += vec1[i];
        copy[i] /= 2;
    }
    return copy;
}

export const breedHelper = async (apiData, model) => {
    let seenSet = new Set();
    let dataSet = [];
    let results = [];
    for (let pegaOuter of apiData) {
        for (let pegaInner of apiData) {
            if (pegaOuter.id === pegaInner.id) continue;
            if (pegaOuter.gender === pegaInner.gender) continue;
            if (seenSet.has((pegaInner.id, pegaOuter.id))) continue;
            if (pegaOuter.breedType !== pegaInner.breedType) continue;
            const mVec = getStatsFromJson(pegaOuter);
            const fVec = getStatsFromJson(pegaInner);
            const cVec = calculateChildVector(mVec, fVec);
            dataSet.push(cVec);
            results.push({lId: pegaOuter.id, rId: pegaInner.id, cVec: cVec});
            seenSet.add((pegaOuter.id, pegaInner.id));
        }
    }
    dataSet = tf.tensor(dataSet);
    const predictions = await predictDataSet(dataSet, model)
    const metaScores = predictions.map(pred => getMetaScore(pred));
    const mergedData = results.map((obj, idx) => ({
        ...obj,
        metaScore: metaScores[idx],
    }))
    return mergedData.sort((a,b) => (a.metaScore > b.metaScore) ? -1 : 1);
}

export const saveAddress = (addr) => {
    localStorage.setItem('pgxHelper', addr);
}

export const loadAddress = () => {
    return localStorage.getItem('pgxHelper') || '';
}

export const getBreedType = (lPar, rPar) => {
    if (lPar === 'Pacer' || rPar === 'Pacer') return 'Pacer';
    if (lPar === 'Rare' || rPar === 'Rare') return 'Pacer';
    if (lPar === 'Epic' || rPar === 'Epic') return 'Rare';
    if (lPar === 'Legendary' || rPar === 'Legendary') return 'Epic';
    if (lPar === 'Founding' || rPar === 'Founding') return 'Legendary';
    return 'Error';
}

export const getBloodLine = (lPar, rPar) => {
    if (lPar === 'Zan' || rPar === 'Zan') return 'Zan';
    if (lPar === 'Klin' || rPar === 'Klin') return 'Klin';
    if (lPar === 'Campona' || rPar === 'Campona') return 'Campona';
    if (lPar === 'Hoz' || rPar === 'Hoz') return 'Hoz';
    return 'Error';
}

export const createEmptyPreferencesObject = () => {
    return {
        currBreedable: true,
        maintainBloodlines: true,
        breedTypes: [
            {
                breedCount: [0,7],
                showInResults: true,
            },
            {
                breedCount: [0,7],
                showInResults: true,
            },
            {
                breedCount: [0,7],
                showInResults: true,
            },
            {
                breedCount: [0,7],
                showInResults: true,
            },
            {
                breedCount: [0,7],
                showInResults: true,
            }
        ]
    }
}

export const setBreedHelperSettings = (obj) => {
    localStorage.setItem('pgxHelperSettings', JSON.stringify(obj));
}

export const getBreedHelperSettings = () => {
    return JSON.parse(localStorage.getItem('pgxHelperSettings')) || createEmptyPreferencesObject();
}