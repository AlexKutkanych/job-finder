import * as React from 'react';
import { Link } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { deepOrange, red } from '@mui/material/colors';
import { Stack } from '@mui/material';
import { useUserLogout } from '../../hooks/useUserLogout';

export default function UserPopover({ username }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { handleLogout } = useUserLogout();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        sx={{ p: 0, minWidth: 40 }}
      >
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
          {username.slice(0, 1).toUpperCase()}
        </Avatar>
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
