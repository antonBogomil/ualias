import Button from "@material-ui/core/Button";
import {t} from "../../store/dictionary";
import {Backdrop} from "@material-ui/core";
import FooterWrapper from "../../components/footer";
import * as React from "react";
import {observer} from "mobx-react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import classNames from "classnames";
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import {useEffect} from "react";

type GamePanelProps = {
  time: number,
  points: number,
  word: string,
  onPause: (isPause: boolean) => void,
  isPause: boolean,
  onChange: (key: string, value: boolean) => void
}

const styles = require('./styles.scss')

export const GamePanel = ({time, word, points, onChange, isPause, onPause}: GamePanelProps) => {
  const alert = (e) => {
	onPause(true)
	e.returnValue = t('Покинути гру? Команда отримає пропуск раунду')
	return e.returnValue
  }


  useEffect(() => {
	window.addEventListener('beforeunload', alert);
	return () => {
	  window.removeEventListener('beforeunload', alert)
	}
  }, [])

  return (
	<div className={styles.container}>
	  <div className={styles.time}>
		<AccessAlarmsIcon/> <span>{time}</span>
	  </div>
	  <div className={styles.points}>
		{t('POINTS')}: {points}
	  </div>
	  <div className={classNames(styles.control, {[styles.paused]: isPause})}>
		<Button
		  type='button'
		  variant={"contained"}
		  color={"primary"}
		  className={classNames(styles.button, styles.correctButton)}
		  fullWidth={true}
		  onClick={() => onChange(word, true)}
		>
		  <KeyboardArrowUpIcon className={styles.buttonIcon}/>
		</Button>
		<div className={styles.word}>
		  {word}
		</div>
		<Button
		  type='button'
		  fullWidth={true}
		  variant={"contained"}
		  color={"secondary"}
		  className={classNames(styles.button)}
		  onClick={() => onChange(word, false)}
		>
		  <KeyboardArrowDownIcon className={styles.buttonIcon}/>
		</Button>
	  </div>


	  <Backdrop className={styles.backdrop} onClick={() => onPause(false)} open={isPause}>
		Paused
	  </Backdrop>
	  <FooterWrapper>
		{
		  isPause ?
			<Button color={"primary"} autoFocus={true} onClick={() => onPause(false)}>{t('CONTINUE')}</Button>
			:
			<Button color={"default"} autoFocus={true} onClick={() => onPause(true)}>{t('PAUSE')}</Button>
		}

	  </FooterWrapper>
	</div>
  )
}

export default observer(GamePanel)
