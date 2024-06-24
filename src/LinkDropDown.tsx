

// Code below has been adapted from https://mui.com/material-ui/react-menu/

import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { PL, GB } from 'country-flag-icons/react/3x2';
import './NavBar/NavBar.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './NavBar/NavBar.css';

interface MenuLink {
  path: string;
  label: string;
}

interface MenuListCompositionProps {
  links: MenuLink[];
  title: string;
}

export default function MenuListUniversal({ links, title }: MenuListCompositionProps) {
  const { i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(i18n.language);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent, language?: string) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

   

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          className="flag"
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{height: '4rem', width: '100%'}}
        >
          <h2 className="links">{title}</h2>

        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {links.map((link) => (
                      <MenuItem key={link.path}>
                        <Link className='home_link' to={link.path}>{link.label}</Link>
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
