import storage from "../tools/LocalStorage";
import {State, Teams, Words} from "./types";
import TeamModel from "../models/Team";

const Api = {
  getTeams(): Promise<Teams> {
	return get('/api/teams')
  },
  getActiveTeam(): Promise<{ team: TeamModel }> {
	return get('/api/team-active')
  },
  saveTeams(data) {
	return post('/api/teams', data)
  },

  getState(): Promise<State> {
	return get('/api/state')
  },
  saveState(data) {
	return post('/api/state', data)
  },
  saveActiveTeam(team: TeamModel) {
	return post('/api/team-active', {
	  team,
	})
  },
  getWords(): Promise<Words> {
	return get('/api/words')
  },

  getRound(): Promise<any> {
	return get('/api/round')
  },

  saveRound(data) {
	return post('/api/round', data)
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
