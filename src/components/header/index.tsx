import React, {useEffect, useState} from 'react';
import {
  AppBar,
  Drawer,
  IconButton,
  List as MaterialList,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import classNames from "classnames";
import {withStore} from "../../tools";
import {Store} from "../../store";
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const Header = () => {
  const [isOpen, setOpen] = useState(false)
  return (
	<div>
	  <AppBar position={'fixed'}>
		<Toolbar>
		  <IconButton
			color="inherit"
			aria-label="open drawer"
			onClick={() => setOpen(true)}
			edge="start"
			className={classNames([])}
		  >
			<MenuIcon/>
		  </IconButton>
		</Toolbar>
	  </AppBar>
	  <Drawer open={isOpen} onClose={() => setOpen(false)}>
		<List/>
	  </Drawer>
	</div>
  );
};

const List = withStore((store => ({store: store})))((props: { store: Store }) => {
  return (
	<MaterialList>
	  <ListItem button key={0} onClick={() => {
		props.store.reset()
	  }}>
		<ListItemIcon><ClearRoundedIcon/></ListItemIcon>
		<ListItemText>Очистити</ListItemText>
	  </ListItem>
	</MaterialList>
  )
})
export default Header;
