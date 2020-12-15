import {action, makeObservable, observable} from "mobx";
import DataStore from "./data";
import Pages from "./pages";


export class Store {
  @observable readonly pages: Pages
  @observable readonly data: DataStore;

  constructor() {
	this.data = new DataStore(this)
	this.pages = new Pages(this)
	makeObservable(this)
  }

  async init() {
	return this.data.init()
  }


  @action
  reset() {
	this.data.teams.reset()
  }
}

const store = new Store()

export default store

