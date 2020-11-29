import {Store} from "../";
import TeamsData from "./teams";
import WordsStore from "./words";
import Settings from "./settings";
import {action, observable} from "mobx";
import Table from "./table";


class DataStore {
  private readonly root: Store;
  readonly teams: TeamsData;
  readonly play: any;
  readonly results: {};
  readonly words: WordsStore;
  readonly settings: Settings
  @observable table: Table;

  constructor(root: Store) {
	this.teams = new TeamsData(root)
	this.words = new WordsStore()
	this.table = new Table([])
	this.settings = new Settings()
	this.play = {}
	this.results = {}
  }


  @action
  createTable = () => {
	this.table = new Table(this.teams.getTeams())
  }

  @action
  clearTable = () => {
	this.table = null
  }

}


export default DataStore
