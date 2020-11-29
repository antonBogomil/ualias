import {action, observable} from "mobx";
import {generateId} from "../tools";
import {ITeamItem} from "../types";

class TeamModel implements ITeamItem {
  readonly id: string
  @observable name: string;

  constructor(id: string, name: string) {
	this.id = id || generateId()
	this.name = name
  }

  @action
  setName(name: string) {
	this.name = name
  }
}

export default TeamModel;
