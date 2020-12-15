import * as React from 'react';
import {useEffect} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {withStore} from "../../tools";
import Page from "../../components/Page";
import FooterWrapper from "../../components/footer";
import ButtonLink from "../../components/ButtonLink";
import {t} from "../../store/dictionary";
import {paths} from "../../constants";
import {RootRouteProps} from "../../types";


const TeamsTable = ({store, ...rest}: RootRouteProps) => {
  const teams = store.data.teams
  useEffect(() => {
	if (teams.isEmpty) {
	  rest.history.push(paths.TEAMS)
	}
  }, [])
  return (
	<Page>
	  <Table>
		<TableHead>
		  <TableRow>
			<TableCell align="left">#</TableCell>
			<TableCell align="left">{t('NAME')}</TableCell>
			<TableCell align="left">{t('ROUNDS')}</TableCell>
			<TableCell align="left">{t('POINTS')}</TableCell>
		  </TableRow>
		</TableHead>
		<TableBody>
		  {teams.getTeams().map((row, i) => {
			return (
			  <TableRow style={{backgroundColor: row === teams.nextActive && '#ccc'}} key={row.id}>
				<TableCell align="left" scope="row">
				  {i}
				</TableCell>
				<TableCell align="left">{row.name}</TableCell>
				<TableCell align="left">{row.rounds}</TableCell>
				<TableCell align="left">{row.points}</TableCell>
			  </TableRow>
			)
		  })}
		</TableBody>
	  </Table>
	  <FooterWrapper>
		<ButtonLink variant={"contained"} color={"secondary"} to={'/teams'}>{t("BACK")}</ButtonLink>
		<ButtonLink variant={"contained"} color={"primary"} autoFocus={true} to={'/playing'}>{t("NEXT")}</ButtonLink>
	  </FooterWrapper>
	</Page>
  );

};

export default withStore(store => ({store: store}))(TeamsTable);
