import * as React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {withStore} from "../../tools";
import Page from "../../components/Page";
import {Store} from "../../store";
import {useEffect} from "react";
import {TablePage} from "../../store/pages";
import FooterWrapper from "../../components/footer";
import ButtonLink from "../../components/ButtonLink";
import {t} from "../../store/dictionary";

const TeamsTable = ({store}: { store: TablePage }) => {

  useEffect(() => {
	console.log(store);
	if (!store.isActive) {
	  window.location.href = '/teams'
	}
  })
  if (store.isActive) return (
	<Page>
	  <Table>
		<TableHead>
		  <TableRow>
			<TableCell align="left">#</TableCell>
			<TableCell align="left">Name</TableCell>
			<TableCell align="left">Rounds</TableCell>
			<TableCell align="left">Points</TableCell>
		  </TableRow>
		</TableHead>
		<TableBody>
		  {store.rows.map((row, i) => (
			<TableRow key={row.team.id}>
			  <TableCell align="left" scope="row">
				{i}
			  </TableCell>
			  <TableCell align="left">{row.team.name}</TableCell>
			  <TableCell align="left">{row.getPlayedTimes()}</TableCell>
			  <TableCell align="left">{row.getPoints()}</TableCell>
			</TableRow>
		  ))}
		</TableBody>
	  </Table>
	  <FooterWrapper>
		<ButtonLink variant={"contained"} color={"secondary"} to={'/teams'}>{t("BACK")}</ButtonLink>
		<ButtonLink variant={"contained"} color={"primary"} to={'/playing'}>{t("NEXT")}</ButtonLink>
	  </FooterWrapper>
	</Page>
  );
  else return null
};

export default withStore(store => ({store: store.pages.table}))(TeamsTable);
