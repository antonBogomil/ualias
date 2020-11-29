import {computed, makeObservable, observable} from "mobx";
import TeamsPage from "./Teams";
import {Store} from "../";

export class TablePage {
  private readonly root: Store

  constructor(root: Store) {
	this.root = root
  }

  @computed
  get isActive() {
	return this.root.data.table.records.length > 0
  }

  @computed
  get rows() {
	return this.root.data.table.records
  }
}

export default class Pages {
  @observable teams: TeamsPage;
  table: TablePage
  private root: Store;

  constructor(root: Store, initialData: any) {
	this.root = root
	this.teams = new TeamsPage(root)
	this.table = new TablePage(root)
	makeObservable(this)
  }

  handleCreateTable = (next) => {
	this.root.data.createTable()
	next()
  }

}
