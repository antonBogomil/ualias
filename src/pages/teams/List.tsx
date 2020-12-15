import React from 'react';
import {
  Avatar,
  IconButton,
  List as StyledList,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {observer} from "mobx-react";
import classNames from "classnames";

interface IProps {
  items: any[],
  onDelete: (id: string) => void
}

const styles = require('./style.scss')
const List = observer(({items, onDelete}: IProps) => {
  return (
	<StyledList className={styles.list}>
	  {items.map(item =>
		<ListItem key={item.id} className={classNames(styles.item, {[styles.active]: false})}>
		  <ListItemAvatar>
			<Avatar variant='circle'/>
		  </ListItemAvatar>
		  <ListItemText>
			{item.name}
		  </ListItemText>
		  <ListItemSecondaryAction>
			<IconButton
			  onClick={(e) => onDelete(item.id)}
			  aria-label="delete"
			>
			  <DeleteIcon/>
			</IconButton>
		  </ListItemSecondaryAction>
		</ListItem>)}
	</StyledList>
  );
});

export default List;
