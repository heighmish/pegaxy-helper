import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import SingleLookup from './pages/SingleLookup';
import AccountLookup from './pages/AccountLookup';
import BreedHelper from './pages/BreedHelper';
import NavBar from "./components/NavBar";
import * as tf from '@tensorflow/tfjs';
import './index.css';


function App() {
  const [model, setModel] = useState(null);
  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await tf.loadLayersModel(process.env.PUBLIC_URL + 'converted_model/model.json');
        setModel(model);
      } catch (err){
        console.log(err);
      }
    }
    loadModel();
  }, [])
  return (
      <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="pega-lookup" element={<SingleLookup model={model}/>} />
            <Route path="account-lookup" element={<AccountLookup />} />
            <Route path="breed-helper" element={<BreedHelper />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
