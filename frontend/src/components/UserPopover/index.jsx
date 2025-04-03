import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { deepOrange, red } from '@mui/material/colors';
import { Stack } from '@mui/material';
import { useUserLogout } from '../../hooks/useUserLogout';

export default function UserPopover({ username, avatar }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const location = useLocation();
  const { handleLogout } = useUserLogout();

  useEffect(() => {
    if (location?.pathname && anchorEl) {
      handleClose();
    }
  }, [location?.pathname]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : '';

  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        sx={{ p: 0, minWidth: 40 }}
      >
        <Avatar alt={username} src={avatar} sx={{ bgcolor: deepOrange[500] }} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Stack sx={{ minWidth: 150 }}>
          <Button
            to='/profile'
            component={Link}
            color='primary'
            variant='text'
            size='small'
            sx={{
              textTransform: 'capitalize',
              padding: '5px 10px',
            }}
          >
            Profile
          </Button>
          <Button
            to='/profile'
            onClick={handleLogout}
            color='primary'
            variant='text'
            size='small'
            sx={{
              textTransform: 'capitalize',
              padding: '5px 10px',
              color: red['700'],
              fontWeight: 700,
            }}
          >
            Logout
          </Button>
        </Stack>
      </Popover>
    </div>
  );
}
