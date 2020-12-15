import React from 'react';
import {Button, Fab, Typography} from "@material-ui/core";
import cn from 'classnames'
import Page from "../../components/Page";
import AddIcon from "@material-ui/icons/Add";
import List from './List'
import TeamsPage from "../../store/pages/Teams";
import TeamsCreateModal from "./Teams.CreateModal";
import {withStore} from "../../tools";
import FooterWrapper from "../../components/footer";
import {t} from "../../store/dictionary";
import {Store} from "../../store";
import DataStore from "../../store/data";
import ButtonLink from "../../components/ButtonLink";
import {paths} from "../../constants";


type IProps = {
  store?: TeamsPage,
  history: any,
}

const styles = require('./style.scss')


export const Teams = ({store}: IProps) => {
  return (
	<div className={cn(styles.root)}>
	  <Page key={'teams'}>
		<Typography variant="h4" component="h4" gutterBottom>{t('TEAM_LIST')}</Typography>
		<List onDelete={store.handleDelete} items={store.list}/>
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
		<div/>
		<ButtonLink disabled={!store.isReady}
					variant={"contained"}
					color={"primary"}
					to={paths.TABLE}
		>
		  {t('NEXT')}
		</ButtonLink>
	  </FooterWrapper>
	</div>
  );
}


export default withStore((store) => {
  return {
	store: store.pages.teams,
  }
})(Teams);



