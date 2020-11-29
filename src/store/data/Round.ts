import {action, computed, configure, observable, ObservableMap, runInAction} from "mobx";
import Settings from "./settings";

configure({
  enforceActions: "always"
});


class RoundStore {
  private readonly settings: Settings;
  @observable private readonly words: ObservableMap<string, boolean> = observable.map()


  constructor(settings: Settings) {
	this.settings = settings
  }

  @computed
  get results() {
	return this.keysArray.map(word => ({
	  label: word,
	  value: this.words.get(word)
	}))
  }

  @computed
  get skippedWords() {
	return this.keysArray.filter((word) => !this.words.get(word))
  }

  @computed
  get correctWords() {
	return this.keysArray.filter((word) => this.words.get(word))
  }


  @computed
  get keysArray() {
	return Array.from(this.words.keys())
  }

  @computed
  get points() {
	return this.correctWords.length - (this.settings.negativeSkip ? this.skippedWords.length : 0)
  }

  @action
  setWord = (word: string, status: boolean) => {
	runInAction(() => {
	  this.words.set(word, status)
	})
  }
}

export default RoundStore
