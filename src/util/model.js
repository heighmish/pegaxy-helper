import * as tf from '@tensorflow/tfjs';

export const getModelPrediction = async (array, model) => {
    // Takes in a 1 dimensional array, reshapes it
    // and returns the predicted value
    const data = tf.tensor(array, [1,6]);
    const pred = await model.predict(data).data()
    return pred[0].toFixed(3);
}