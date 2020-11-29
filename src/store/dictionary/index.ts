import {action, computed, makeObservable, observable} from "mobx";

class Dict {
  @observable private data = {}

  constructor() {
	this.load()
	makeObservable(this)
  }

  load() {
	import('../dictionary/dict.json').then((res) => {
	  this.setData(res)
	})
  }

  @action
  setData(data) {
	this.data = data
  }

  @computed
  get isReady() {
	return Object.keys(this.data).length > 0
  }

  t = (key: string) => {
	return this.data[key] || key
  }
}

const dict = new Dict()
export default dict
export const t = dict.t
