import {action, observable} from "mobx";
import {generateId} from "../tools";
import {ITeamItem} from "../types";

class TeamModel implements ITeamItem {
  readonly id: string
  @observable name: string;
  @observable points: number;
  @observable rounds: number;

  constructor(props: { id: string, name: string, points?: number, rounds?: number }) {
	const {id, name, points, rounds} = props
	this.id = id || generateId()
	this.name = name
	this.points = points || 0
	this.rounds = rounds || 0
  }


  @action
  setRounts = (rounds: number) => {
	this.rounds = rounds
  }

  @action
  setPoints = (points: number) => {
	this.points = points
  }

  @action
  setName(name: string) {
	this.name = name
  }
}

export default TeamModel;
