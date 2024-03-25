import { AppBar, Box, Toolbar } from '@mui/material';
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
    fontFamily: 'Barlow Condensed, sans-serif',
  },
  navLogo: {
    cursor: 'pointer',
    flexGrow: 1,
    fontSize: '2rem',
    fontWeight: 400,
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
          smart
        </Box>
        <Box sx={useStyles.itemsContainer}>
          {navBarLinks.map(({ url, label }: NavabarLink) => {
            return (
              <Box sx={useStyles.navItem} onClick={() => navigate(url)}>
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
