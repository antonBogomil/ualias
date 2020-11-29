import {Store} from "../";
import TeamsData from "./teams";
import {action, observable} from "mobx";
import WordsStore from "./words";
import Settings from "./settings";


class DataStore {
  private readonly root: Store;
  readonly teams: TeamsData;
  readonly play: any;
  readonly results: {};
  readonly words: WordsStore;
  readonly settings: Settings

  @observable activeTeamId: string = null

  constructor(root: Store) {
	this.teams = new TeamsData(root)
	this.words = new WordsStore()
	this.settings = new Settings()
	this.play = {}
	this.results = {}
  }


  @action
  setActiveTeam(id: string) {
	this.activeTeamId = id
  }

}

export default DataStore
