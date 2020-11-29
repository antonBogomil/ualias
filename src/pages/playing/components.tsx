import {t} from "../../store/dictionary";
import * as React from "react";
import Button from "@material-ui/core/Button";
import {useEffect} from "react";
import {observer} from "mobx-react";
import FooterWrapper from "../../components/footer";
import {computed} from "mobx";
import ButtonLink from "../../components/ButtonLink";
import {FormControlLabel, Switch} from "@material-ui/core";

const styles = require('./styles.scss')
type GamePanelProps = {
  time: number,
  points: number,
  word: string,
  handeChange: (key: string, value: boolean) => () => void
}

export const PreRoundComponent = observer(() => {
	return (
	  <div>
		{t('READY')}
	  </div>
	)
  }
)

type PostRoundComponentProps = {
  results: { label: string, value: boolean }[],
  points: number,
  handleChange: (key: string, value: boolean) => void
}

export function PostRoundComponent({results, points, handleChange}: PostRoundComponentProps) {
  return (
	<div className={styles.results}>
	  <div className={styles.sub}>
		Points: {points}
	  </div>
	  <ul className={styles.list}>
		{results.map(word => (
		  <li key={word.label}>
			<FormControlLabel
			  control={
				<Switch
				  checked={word.value}
				  onChange={(e) => handleChange(word.label, e.currentTarget.checked)}
				  name={word.label}
				  color="primary"
				/>
			  }
			  label={word.label}
			/>
		  </li>
		))}
	  </ul>
	</div>
  )
}

export function GamePanel({time, word, points, handeChange}: GamePanelProps) {
  return (
	<>
	  <div>
		{time}
	  </div>
	  <Button
		type='button'
		variant={"contained"}
		color={"primary"}
		onClick={handeChange(word, true)}
	  >
		Correct
	  </Button>
	  <div>
		{word}
	  </div>
	  <div>
		{t('POINTS')}: {points}
	  </div>
	  <Button
		type='button'
		variant={"contained"}
		color={"secondary"}
		onClick={handeChange(word, false)}
	  >
		Wrong
	  </Button>
	</>
  )
}


type NavigationProps = {
  isTimeout: boolean, isRunning: boolean, isPause: boolean,
  handlePauseEnd: () => void, handlePause: () => void, handleStart: () => void
}

export function Navigation(
  {
	isTimeout, isRunning,
	isPause, handlePauseEnd, handlePause, handleStart
  }: NavigationProps) {
  return (
	<>
	  {
		isRunning ? (
		  isPause ?
			<Button color={"primary"} onClick={handlePauseEnd}>Continue</Button>
			:
			<Button color={"default"} onClick={handlePause}>Pause</Button>
		) : (
		  isTimeout ?
			<ButtonLink to={'/results'} color={"primary"}>Next</ButtonLink>
			:
			<Button color={"default"} onClick={handleStart}>Start</Button>
		)
	  }
	</>
  )
}
