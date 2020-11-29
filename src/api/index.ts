import storage from "../tools/LocalStorage";
import {Teams, Words} from "./types";

const Api = {
  getTeams: function (): Promise<Teams> {
	return get('/api/teams')
  },
  saveTeams: function (data) {
	return post('/api/teams', data)
  },


  getWords: function (): Promise<Words> {
	return get('/api/words')
  }
}
export default Api

function post(path: string, json: object) {
  console.log('Post ', path, json);
  return new Promise((resolve, reject) => {
	try {
	  storage.set(path, json)
	  resolve()
	} catch (e) {
	  console.error(e);
	  reject()
	}
  })
}

function deleteFromCollection(path: string, key: string, value) {
  return new Promise((res, rej) => {
	try {
	  const collection = storage.get(path)
	  if (collection?.length > 0) {
		const newCollection = collection.filter(i => i[key] !== value)
	  } else {
		rej(404)
	  }
	} catch (e) {
	  rej(500)
	}
  })
}

function get<T>(path: string): Promise<T> {
  console.log('GET: ', path);
  return new Promise((resolve, reject) => {
	const data = storage.get(path)
	resolve(data)
  })
}
