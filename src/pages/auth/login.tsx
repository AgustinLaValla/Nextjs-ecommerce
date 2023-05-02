
import React from 'react'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { getProviders, getSession, signIn } from 'next-auth/react'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'

const login: NextPage = () => {

  const [providers, setProviders] = React.useState<any>({});

  React.useEffect(() => {
    getProviders().then(prov => setProviders(prov));
  }, [])

  return (

    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
      <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
        {
          Object.values(providers).map((provider: any) => {

            if (provider.id === 'credentials') return (<div key="credentials"></div>);

            console.log(provider);
            return (
              <Button
                key={provider.id}
                variant="outlined"
                fullWidth
                color="primary"
                sx={{ mb: 1 }}
                onClick={() => signIn(provider.id)}
                size='large'
              >
                <img
                  src={`/provider-logos/${provider.name}.png`}
                  alt={`${provider.name} logo`}
                  style={{ width: '35px', height: '35px', marginRight: '1rem' }}
                />
                <Typography
                  variant='body1'
                  style={{ fontSize: '1.5rem' }}>
                  Sign in with  {provider.name}
                </Typography>
              </Button>
            )

          })
        }

      </Grid>
    </Box>
  )
}


// Session should be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });

  const { p = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default login