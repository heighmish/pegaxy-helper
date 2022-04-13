import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import SingleLookup from './pages/SingleLookup';
import AccountLookup from './pages/AccountLookup';
import BreedHelper from './pages/BreedHelper';
import NavBar from "./components/NavBar";
import * as tf from '@tensorflow/tfjs';
import './index.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


function App() {
  const [model, setModel] = useState(null);
  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await tf.loadLayersModel(process.env.PUBLIC_URL + '/javascript_model/model.json');
        setModel(model);
      } catch (err){
        console.log(err);
      }
    }
    loadModel();
  }, [])

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="/" element={<SingleLookup model={model}/>} />
            <Route path="/pegaxy-helper" element={<SingleLookup model={model}/>} />
            <Route path="pega-lookup" element={<SingleLookup model={model}/>} />
            <Route path="account-lookup" element={<AccountLookup model={model}/>} />
            <Route path="breed-helper" element={<BreedHelper model={model}/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
