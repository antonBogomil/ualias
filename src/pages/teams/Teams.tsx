import React from 'react';
import {Fab, Typography} from "@material-ui/core";
import cn from 'classnames'
import Page from "../../components/Page";
import AddIcon from "@material-ui/icons/Add";
import List from './List'
import TeamsPage from "../../store/pages/Teams";
import TeamsCreateModal from "./Teams.CreateModal";
import {withStore} from "../../tools";
import FooterWrapper from "../../components/footer";
import ButtonLink from "../../components/ButtonLink";


type IProps = {
  store?: TeamsPage
}

const styles = require('./style.scss')


export const Teams = ({store,...rest}: IProps) => {
  return (
	<div className={cn(styles.root)}>
	  <Page key={'teams'}>
		<Typography variant="h4" component="h4" gutterBottom>Teams list</Typography>
		<List items={store.list}/>
		<Fab onClick={store.handleToggleModal} color="secondary" aria-label="add">
		  <AddIcon/>
		</Fab>
	  </Page>
	  <TeamsCreateModal
		isOpen={store.isOpenModal}
		handleSave={store.handleCreate}
		handleClose={store.handleToggleModal}
		name={store.name}
		errors={store.errorsKeys}
		handleChange={store.handleChangeName}
	  />

	  <FooterWrapper>
		<ButtonLink disabled={!store.isReady} variant={"contained"} color={"primary"} to={'/start'}>
		  Next
		</ButtonLink>
	  </FooterWrapper>
	</div>
  );
}


export default withStore((store) => {
  return store.pages.teams
})(Teams);



