import React from 'react';
import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import classNames from "classnames";

const Header = () => {
  return (
	<div>
	  <AppBar position={'fixed'}>
		<Toolbar>
		  <IconButton
			color="inherit"
			aria-label="open drawer"
			onClick={() => {
			}}
			edge="start"
			className={classNames([])}
		  >
			<MenuIcon/>
		  </IconButton>
		</Toolbar>
	  </AppBar>
	</div>
  );
};

export default Header;
