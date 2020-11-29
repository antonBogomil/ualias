import {deserialize, serialzr} from "./";

const STORE_KEY = '_myApp_'

class LocalStorage {

  set(key = STORE_KEY, json: Object) {
	this.size()
	const serialzr1 = serialzr(json)
	window.localStorage.setItem(key, serialzr1)
  }

  get(key = STORE_KEY) {
	const stringData = window.localStorage.getItem(key);
	return stringData ? deserialize(stringData) : null
  }

  size() {
	let total = 0,
	  record, key;
	for (key in localStorage) {
	  if (!localStorage.hasOwnProperty(key)) {
		continue;
	  }
	  record = ((localStorage[key].length + key.length) * 2);
	  total += record;
	}
	const totalKB = +(total / 1024).toFixed(2)
	if (totalKB > 4500) {
	  alert(`Storage limit: ${((totalKB / 5000) * 100).toFixed(2)}%`)
	  console.log("Total: " + totalKB + " KB", '/ 5000 KB');
	}
	return total
  }

}

export default new LocalStorage();
