import React from 'react';
import { Helmet } from 'react-helmet-async';
import CenteredContainer from '../components/CenteredContainer';
import Grid from '@mui/material/Grid';
import HomeCard from '../components/HomeCard';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Home = () => {
  
  return (
    <>
      <Helmet>
          <title>Pegaxy Helper</title>
      </Helmet>
      <CenteredContainer maxWidth='md' sx={{ flexDirection: 'column' }}>
        <Typography variant="h3" component="h1" mt={1}>
          Pegaxy Helper
          <Divider />
        </Typography>
        <Typography variant="body1" component="div" mt={1}>
          Welcome to the Pegaxy Helper, a community made tool to provide pegaxy players with useful information to help make decisions!
        </Typography>
        <Typography variant="body1" component="div" mt={1}>
          This website is powered by AI trained to predict the metascore of a pega.
        </Typography>
        <Typography variant="h5" component="h2" mt={1}>
          What is the Metascore?
          <Divider />
        </Typography>
        <Typography variant="body1" component="div" mt={1}>
          The metascore is a prediction of a pega's vis earning potential rated from 0 to 10, based on its 6 stats, speed, strength, wind, water, fire and lightning.
          The prediction uses artificial intelligence technology trained on races from over 300,000 pegas.
          The metascore is not perfect, it is prone to mistakes, rating pegas better or worse than they actual are. 
          However, it is extremely useful for learning how pega stats work and for quickly evaluating a pega that has never raced before.
        </Typography>
        <Typography variant="h5" component="h2" mt={1}>
          What we offer:
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{xs: 12, sm: 12 }}>
          <Grid item xs={12} sm={6}>
            <HomeCard
              title="Pega Lookup"
              description="Look up a pegas ID to see useful information, such as stats, average vis the pega earns per race and a metascore. Alternatively, enter in stats of a pega to get an AI predicted metascore."
              linkHref = "/pega-lookup"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HomeCard
              title="Account Lookup"
              description="Look up a wallet address, shows average vis earnings, metascores, stats and more for all pegas in an account."
              linkHref = "/account-lookup"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HomeCard
              title="Breed Helper"
              description="Uses AI to find good pega candidate parents to breed with for a wallet."
              linkHref = "/breed-helper"
            />
          </Grid>
        </Grid>
      </CenteredContainer>
    </>
  )
}

export default Home;
