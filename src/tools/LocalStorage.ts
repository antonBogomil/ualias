import {deserialize} from "./";

const STORE_KEY = '_myApp_'

class LocalStorage {

  set(json: string) {
	console.log('saved : ', json);
	window.localStorage.setItem(STORE_KEY, json)
  }

  get() {
	const stringData = window.localStorage.getItem(STORE_KEY);
	return stringData ? deserialize(stringData) : null
  }

}

export default new LocalStorage();
