import {makeObservable, observable} from "mobx";
import DataStore from "./data";
import Pages from "./pages";
import Routing from "./routing";


export class Store {
  @observable readonly pages: Pages
  @observable readonly data: DataStore;
  private routing: Routing;

  constructor(initialData: any) {
	this.data = new DataStore(this)
	this.pages = new Pages(this, initialData)
	this.routing = new Routing()
	makeObservable(this)
  }

  async init() {
	return this.data.teams.init()
  }
}

const store = new Store({})

export default store

