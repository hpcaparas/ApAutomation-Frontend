import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../utils/cssStyles';
import AccountPopover from './AccountPopover';
import ExpenseManagementLogoTop from '../../images/ExpenseManagementLogoTop.png'
import ExpenseManagement_BGOnly_Img from '../../images/ExpenseManagement_BGOnly.png'
import MobileBtn from './MobileBtn';
import { NAV_WIDTH, HEADER_MOBILE, HEADER_DESKTOP} from '../../Constants'
import Iconify from '../../components/iconify'; 
// ----------------------------------------------------------------------

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.paper }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  overflow: 'hidden',
  position: 'sticky',
  minHeight: HEADER_MOBILE,
  backgroundImage: `url(${ExpenseManagement_BGOnly_Img})`,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  }
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  return (
      <StyledToolbar>
         <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'cyan',
            display: { lg: 'none' },
          }}
          >  
          <Iconify icon="eva:menu-2-fill" />
          </IconButton>
          {/* <MobileBtn/> */}
          <img src={ExpenseManagementLogoTop} alt="logo" style={{maxWidth: '30%'}} />

          {/* <Searchbar /> */}
          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            alignItems="center"
            spacing={{
              xs: 0.5,
              sm: 1,
            }}
          >
        {/*       <LanguagePopover />
          <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>
      </StyledToolbar>
  );
}
