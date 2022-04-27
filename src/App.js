import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation} from "react-router-dom";
import SingleLookup from './pages/SingleLookup';
import AccountLookup from './pages/AccountLookup';
import BreedHelper from './pages/BreedHelper';
import Home from './pages/Home';
import NavBar from "./components/NavBar";
import * as tf from '@tensorflow/tfjs';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ReactGA from 'react-ga';

const TRACKING_ID = 'UA-226866037-1';
ReactGA.initialize(TRACKING_ID);

const usePageViews = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location])
}

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
  usePageViews();
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <NavBar colourScheme={colourScheme} setColourScheme={setColourScheme}/>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/pega-lookup" element={<SingleLookup model={model}/>} />
              <Route path="/account-lookup" element={<AccountLookup model={model}/>} />
              <Route path="/breed-helper" element={<BreedHelper model={model}/>} />
          </Routes>
      </ThemeProvider>
  );
}

export default App;
