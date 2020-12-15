import {Store} from "../";
import TeamsData from "./teams";
import WordsStore from "./words";
import Settings from "./settings";
import {action, autorun, observable} from "mobx";
import Api from "../../api";
import Round from "../../models/Round";


class DataStore {
  readonly teams: TeamsData;
  readonly words: WordsStore;
  readonly settings: Settings

  constructor(root: Store) {
	this.teams = new TeamsData(root)
	this.words = new WordsStore()
	this.settings = new Settings()
  }


  @action
  init = async () => {
	return this.teams.init()
  }
}


export default DataStore
