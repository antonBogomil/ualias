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

interface IProps {
  items: any[],
  onDelete: (id: string) => void
}

const List = observer(({items, onDelete}: IProps) => {
  return (
	<StyledList>
	  {items.map(item =>
		<ListItem key={item.id}>
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
