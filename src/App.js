import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import SingleLookup from './pages/SingleLookup';
import AccountLookup from './pages/AccountLookup';
import BreedHelper from './pages/BreedHelper';
import Home from './pages/Home';
import NavBar from "./components/NavBar";
import * as tf from '@tensorflow/tfjs';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';


function App() {
  const [model, setModel] = useState(null);
  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await tf.loadLayersModel(process.env.PUBLIC_URL + '/javascript_model/model.json');
        setModel(model);
      } catch (err){
        console.log(err);
        alert("Machine learning model failed to load, metascore predictions will be unavailable.")
      }
    }
    loadModel();
  }, [])
  const [colourScheme, setColourScheme] = useState(useMediaQuery('(prefers-color-scheme: dark)'));
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: colourScheme ? 'dark' : 'light',
        },
      }),
    [colourScheme],
  );
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <NavBar colourScheme={colourScheme} setColourScheme={setColourScheme}/>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="pega-lookup" element={<SingleLookup model={model}/>} />
              <Route path="account-lookup" element={<AccountLookup model={model}/>} />
              <Route path="breed-helper" element={<BreedHelper model={model}/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
