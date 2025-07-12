// import React from 'react';
// import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
// import { styled } from '@mui/system';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import HelpIcon from '@mui/icons-material/Help';
// import cidcowhite from '../../Assets/cidcowhite.png'
// const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'space-between',
// }));

// const RightIconsContainer = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
// }));

// const WhiteNotificationIcon = styled(NotificationsIcon)(({ theme }) => ({
//   color: theme.palette.common.white,
// }));

// const IconTooltip = styled(Tooltip)(({ theme }) => ({
//   marginLeft: theme.spacing(2),
//   color: theme.palette.common.white,
// }));
// const FillSpace = styled('div')({
//   flex: 1,
// });

// const Header = () => {
//   return (
//     <StyledAppBar position="static" sx={{backgroundColor: '#001D35'
//     }}>
//       <Toolbar>
//         <Typography variant="h6"><img src={cidcowhite} alt={"Logo"}  /></Typography>
//         <FillSpace />
//         <RightIconsContainer>
//           <IconTooltip title="Help">
//             <IconButton>
//               <HelpIcon />
//             </IconButton>
//           </IconTooltip>
//           <IconTooltip title="Notifications">
//             <IconButton style={{ marginLeft: 'auto' }}>
//               <WhiteNotificationIcon />
//             </IconButton>
//           </IconTooltip>
//         </RightIconsContainer>
//       </Toolbar>
//     </StyledAppBar>
//   );
// };

// export default Header;


import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import cidcowhite from '../../Assets/cidcowhite.png';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const RightIconsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const WhiteNotificationIcon = styled(NotificationsIcon)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const IconTooltip = styled(Tooltip)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: theme.palette.common.white,
}));

const FillSpace = styled('div')({
  flex: 1,
});

const Header = ({ socket }) => {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    socket.on('addProductResponse', (data) => {
      setNotification(`@${data.owner} just added ${data.name} worth $${Number(data.price).toLocaleString()}`);
    });
    socket.on('bidProductResponse', (data) => {
      setNotification(`@${data.last_bidder} just bid ${data.name} for $${Number(data.amount).toLocaleString()}`);
    });
  }, [socket]);

  return (
    <StyledAppBar position="static" sx={{ backgroundColor: '#001D35' }}>
      <Toolbar>
        <Typography variant="h6">
          <img src={cidcowhite} alt="Logo" />
        </Typography>
        <FillSpace />
          <div style={{ color: 'white', marginLeft: '8px' }}>{notification}</div>
        <RightIconsContainer>
          <IconTooltip title="Help">
            <IconButton>
              <HelpIcon />
            </IconButton>
          </IconTooltip>
          <IconTooltip title="Notifications">
            <IconButton style={{ marginLeft: 'auto' }}>
              <WhiteNotificationIcon />
            </IconButton>
          </IconTooltip>
        </RightIconsContainer>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
