import {makeObservable, observable} from "mobx";
import TeamsPage from "./Teams";
import {Store} from "../";

export default class Pages {
  @observable teams: TeamsPage;

  constructor(root: Store, initialData: any) {
	this.teams = new TeamsPage(root.data.teams, initialData?.pages?.teams?.data?.teams)
	makeObservable(this)
  }
}
