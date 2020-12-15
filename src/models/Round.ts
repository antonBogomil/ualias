import {action, computed, configure, makeObservable, observable, ObservableMap, runInAction} from "mobx";
import Settings from "../store/data/settings";
import TeamModel from "./Team";

configure({
  enforceActions: "always"
});
type Props = {
  settings: Settings,
  team: TeamModel,
  wordsHistory?: ObservableMap<string, boolean>,
  time?: number,
  paused?: boolean,
  word?: string,
}

class RoundStore {
  private timer = null
  readonly settings: Settings;
  readonly team: TeamModel;
  @observable isPaused: boolean = false
  @observable word: string = ''
  @observable time: number = 0
  @observable readonly wordsHistory: ObservableMap<string, boolean> = observable.map()


  constructor(props: Props) {
	this.settings = props.settings
	this.team = props.team
	this.time = props.time || 0
	this.isPaused = props.paused || false
	this.word = props.word || ''
	makeObservable(this);
	// props.wordsHistory.map(this.word=> this.setWordHistry())
  }

  @computed
  get results() {
	return this.keysArray.map(word => ({
	  label: word,
	  value: this.wordsHistory.get(word)
	}))
  }

  @computed
  get skippedWords() {
	return this.keysArray.filter((word) => !this.wordsHistory.get(word))
  }

  @computed
  get correctWords() {
	return this.keysArray.filter((word) => this.wordsHistory.get(word))
  }


  @computed
  get keysArray() {
	return Array.from(this.wordsHistory.keys())
  }

  @computed
  get points() {
	return this.correctWords.length - (this.settings.negativeSkip ? this.skippedWords.length : 0)
  }

  @action
  setWordHistry = (word: string, status: boolean) => {
	runInAction(() => {
	  this.wordsHistory.set(word, status)
	})
  }

  @action
  incrementTime = () => {
	if (!this.isTimeout) {
	  this.time = this.time + 1
	}
  }

  @action
  setWord = (word: string) => {
	this.word = word
  }

  @computed
  get isTimeout() {
	return this.time >= this.settings.roundTimeSeconds
  }

  @action
  run() {
	this.timer = setInterval(() => {
	  this.incrementTime()
	}, 1000)
  }

  @action
  setPause = (pause: boolean) => {
	pause ? this.stop() : this.run()
	this.isPaused = pause
  }

  stop() {
	clearInterval(this.timer)
  }

}

export default RoundStore
