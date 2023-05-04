import React from 'react'
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useCartContext, useUIContext } from '../context';

export const Navbar = () => {

  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useUIContext();
  const { numberOfItems } = useCartContext();

  const [searchTerm, setSearchTerm] = React.useState('');
  const [isSearchVisible, setIsSearchVisible] = React.useState(false);

  const onSearchTerm = () => {
    if (!searchTerm.trim().length) return;
    push(`/search/${searchTerm}`);
  }

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref legacyBehavior>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Skeleton |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
          className="fadeIn">
          <NextLink href='/category/men' passHref legacyBehavior>
            <Link>
              <Button color={asPath === '/category/men' ? 'primary' : 'info'}>Men</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref legacyBehavior>
            <Link>
              <Button color={asPath === '/category/women' ? 'primary' : 'info'}>Women</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kid' passHref legacyBehavior>
            <Link>
              <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>Kid</Button>
            </Link>
          </NextLink>
        </Box>


        <Box flex={1} />



        {/* Large screens */}
        {
          isSearchVisible
            ? (
              <Input
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                className='fadeIn'
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                type='text'
                placeholder="Buscar..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsSearchVisible(false)}
                    >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )
            :
            (
              <IconButton
                onClick={() => setIsSearchVisible(true)}
                className="fadeIn"
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                <SearchOutlined />
              </IconButton>
            )
        }


        {/* Small screens */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>


        <Button onClick={toggleSideMenu}>
          Menú
        </Button>

      </Toolbar>
    </AppBar>
  )
}
