import {action, computed} from "mobx";
import json from '../../../data/dict.json'

class WordsStore {
  private dict: string[] = json
  private unavailable: string[]
  private index = 0


  @computed
  get notEmpty() {
	return this.dict.length
  }

  @action
  next() {
	return this.dict[this.index++]
  }
}

export default WordsStore
