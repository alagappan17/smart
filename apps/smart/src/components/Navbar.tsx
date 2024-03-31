import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export type NavabarLink = {
  url: string;
  label: string;
};

const useStyles = {
  navBar: {
    backgroundColor: 'white',
    color: 'black',
    boxShadow: 'none',
    fontSize: 40,
  },
  navLogo: {
    cursor: 'pointer',
    flexGrow: 1,
    fontSize: '2rem',
    fontWeight: 400,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemsContainer: {
    gap: 4,
    display: 'flex',
  },
  navItem: {
    cursor: 'pointer',
    fontSize: 30,
    fontWeight: 300,
  },
};

const NAVBARLINKS: NavabarLink[] = [
  {
    url: '/playground',
    label: 'playground',
  },
  {
    url: '/query',
    label: 'query',
  },
  {
    url: '/blocks',
    label: 'blocks',
  },
  {
    url: '/results',
    label: 'results',
  },
];

type NavbarProps = {
  navBarLinks: NavabarLink[];
};

export const Navbar = ({ navBarLinks }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={useStyles.navBar}>
      <Toolbar>
        <Box onClick={() => navigate('/')} sx={useStyles.navLogo}>
          <img src={'./smart_logo_black.png'} alt="logo" loading="lazy" height={50} />
        </Box>
        <Box sx={useStyles.itemsContainer}>
          {navBarLinks.map(({ url, label }: NavabarLink, index: number) => {
            return (
              <Box sx={useStyles.navItem} onClick={() => navigate(url)} key={index}>
                {label}
              </Box>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Navbar.defaultProps = {
  navBarLinks: NAVBARLINKS,
};

export default Navbar;
