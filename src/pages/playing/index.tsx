import * as React from 'react';
import Page from "../../components/Page";
import {action, autorun, computed, makeObservable, observable} from "mobx";
import {withStore} from "../../tools";
import DataStore from "store/data";
import FooterWrapper from "../../components/footer";
import dict from "../../store/dictionary";
import {GamePanel, Navigation, PostRoundComponent, PreRoundComponent} from "./components";
import RoundStore from "../../store/data/Round";


type IProps = {
  store?: DataStore
}


class Playing extends React.Component<IProps> {
  roundStore: RoundStore

  @observable timer = null
  @observable displayWord: string = ''
  @observable time: number = 0
  @observable pause: boolean
  @observable isRunning: boolean

  constructor(props) {
	super(props);
	makeObservable(this)
	autorun(() => {
	  if (this.isTimeout) {
		this.finish()
	  }
	})
  }

  componentDidMount() {
	this.roundStore = new RoundStore(this.props.store.settings)
  }

  @action setRunning = (isRunning: boolean) => this.isRunning = isRunning

  @computed get isTimeout() {
	return this.time === this.props.store.settings.roundTimeSeconds
  }

  @action setPause = (pause: boolean) => this.pause = pause

  @action handleStart = () => {
	this.nextWord()
	this.setRunning(true)
	this.time = 0
	this.runTimer()
  }
  @action finish = () => {
	this.stopTimer()
	this.setRunning(false)
  }

  handlePause = () => {
	this.setPause(true)
	this.stopTimer()
  }
  handlePauseEnd = () => {
	this.setPause(false)
	this.runTimer()
  }

  @action incrementTime = () => this.time++

  @action stopTimer = () => {
	clearInterval(this.timer)
	this.timer = null
  }
  @action runTimer = () => {
	this.timer = setInterval(this.incrementTime, 1000)
  }
  @action nextWord = () => this.displayWord = this.props.store.words.next()

  handeChange = (word: string, value: boolean) => {
	return () => {
	  this.roundStore.setWord(word, value)
	  this.nextWord()
	}
  }

  render() {
	if (!dict.isReady) return null
	return (
	  <Page>
		{
		  this.isRunning ?
			<GamePanel
			  points={this.roundStore.points}
			  time={this.time}
			  handeChange={this.handeChange}
			  word={this.displayWord}/>
			:
			this.isTimeout ?
			  <PostRoundComponent
				points={this.roundStore.points}
				handleChange={this.roundStore.setWord}
				results={this.roundStore.results}
			  /> :
			  <PreRoundComponent/>
		}
		<FooterWrapper>
		  <Navigation
			isPause={this.pause}
			isRunning={this.isRunning}
			isTimeout={this.isTimeout}
			handlePause={this.handlePause}
			handlePauseEnd={this.handlePauseEnd}
			handleStart={this.handleStart}
		  />
		</FooterWrapper>
	  </Page>
	);
  }
}

export default withStore((store) => store.data)(Playing);
