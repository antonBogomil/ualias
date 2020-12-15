import {t} from "../../store/dictionary";
import * as React from "react";
import Button from "@material-ui/core/Button";
import {observer} from "mobx-react";
import FooterWrapper from "../../components/footer";
import ButtonLink from "../../components/ButtonLink";
import {FormControlLabel, Switch} from "@material-ui/core";
import TeamModel from "../../models/Team";
import {paths} from "../../constants";

const styles = require('./styles.scss')
export const PreRoundComponent = observer(({team, onStart}: { team: TeamModel, onStart }) => {
	return (
	  <div>
		{t('READY')}
		<div>
		  {team?.name}
		</div>
		<FooterWrapper>
		  <ButtonLink to={paths.TABLE} variant="contained" color="secondary">{t('BACK')}</ButtonLink>
		  <Button color="primary" autoFocus={true} variant="contained" onClick={onStart}>{t('START')}</Button>
		</FooterWrapper>
	  </div>
	)
  }
)

type PostRoundComponentProps = {
  results: { label: string, value: boolean }[],
  points: number,
  onClick: () => void,
  onChange: (key: string, value: boolean) => void,
}

export function PostRoundComponent({results, points, onChange, onClick}: PostRoundComponentProps) {
  return (
	<div className={styles.results}>
	  <div className={styles.sub}>
		{t("POINTS")}: {points}
	  </div>
	  <ul className={styles.list}>
		{results.map(word => (
		  <li key={word.label}>
			<FormControlLabel
			  control={
				<Switch
				  checked={word.value}
				  onChange={(e) => onChange(word.label, e.currentTarget.checked)}
				  name={word.label}
				  color="primary"
				/>
			  }
			  label={word.label}
			/>
		  </li>
		))}
	  </ul>
	  <FooterWrapper>
		<Button
		  onClick={onClick}
		  fullWidth={true}
		  variant="contained"
		  autoFocus={true}
		  color={"primary"}>
		  {t('END_ROUND')}
		</Button>
	  </FooterWrapper>
	</div>
  )
}
