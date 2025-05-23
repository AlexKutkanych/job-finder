import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import navItems from '../../mock/navItems';
import { useAuth } from '../../context/AuthContext';
import UserPopover from '../UserPopover';
import { useUserLogout } from '../../hooks/useUserLogout';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();
  const { handleLogout } = useUserLogout();

  const username = auth?.user?.username;
  const isLoggedIn = auth?.hasToken && username;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position='fixed'
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        pt: 'calc(var(--template-frame-height, 0px) + 28px)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth='lg'>
        <StyledToolbar
          variant='dense'
          disableGutters
          sx={{ flexDirection: { xs: 'row-reverse', md: 'row' } }}
        >
          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}
          >
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navItems.map(({ id, url, label }) => (
                <Button
                  key={id}
                  to={url}
                  component={Link}
                  variant='text'
                  color='info'
                  size='small'
                >
                  {label}
                </Button>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {isLoggedIn ? (
              <UserPopover username={username} avatar={auth?.user?.avatar} />
            ) : (
              <>
                <Button
                  to='/sign-in'
                  component={Link}
                  color='primary'
                  variant='text'
                  size='small'
                >
                  Sign in
                </Button>
                <Button
                  to='/sign-up'
                  component={Link}
                  color='primary'
                  variant='contained'
                  size='small'
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              gap: 1,
            }}
          >
            <IconButton aria-label='Menu button' onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor='top'
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {navItems.map(({ id, url, label }) => (
                  <MenuItem
                    key={id}
                    to={url}
                    component={Link}
                    variant='text'
                    color='info'
                    size='small'
                  >
                    {label}
                  </MenuItem>
                ))}
                <Divider sx={{ my: 3 }} />
                {isLoggedIn ? (
                  <>
                    <MenuItem>
                      <Button
                        to='/profile'
                        component={Link}
                        color='primary'
                        variant='text'
                        size='small'
                      >
                        Profile
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        to='/profile'
                        onClick={handleLogout}
                        color='primary'
                        variant='text'
                        size='small'
                        sx={{
                          color: red['700'],
                          fontWeight: 700,
                        }}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Button
                        to='/sign-up'
                        component={Link}
                        color='primary'
                        variant='contained'
                        fullWidth
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        to='/sign-in'
                        component={Link}
                        color='primary'
                        variant='outlined'
                        fullWidth
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
