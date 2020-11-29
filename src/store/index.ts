import {serialzr} from "../tools";
import {autorun, makeObservable, observable, toJS} from "mobx";
import storage from "../tools/LocalStorage";
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
}

function autoSave() {
  let firstRun = true;
  autorun(() => {
	const data = toJS(store)
	if (!firstRun) {
	  storage.set(serialzr(data));
	}
	firstRun = false;
  });
}

const store = new Store(storage.get())
// autoSave();
export default store

