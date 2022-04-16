import * as tf from '@tensorflow/tfjs';

export const getModelPrediction = async (array, model) => {
    // Takes in a 1 dimensional array, reshapes it
    // and returns the predicted value
    const data = tf.tensor(array, [1,6]);
    const pred = await model.predict(data).data()
    return pred[0].toFixed(3);
}


export const createDataSetFromJson = async (pegas, model) => {
    const data = tf.tensor(pegas.map(p => [p.speed, p.strength, p.lightning, p.wind, p.water, p.fire]));
    const pred = await model.predict(data).data()
    return pred;    
}

export const predictDataSet = async (data, model) => {
    const pred = await model.predict(data).data()
    return pred;  
}