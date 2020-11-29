import TeamModel from "../../../models/Team";
import {generateId} from "../../../tools";
import {Store} from "../../index";
import {action, makeObservable, observable} from "mobx";


class TeamsData {
  private readonly root: Store;
  @observable teams: TeamModel[];


  constructor(root: Store, initialData: TeamModel[] = []) {
	this.teams = []
	this.createTeams(initialData)
	this.root = root
	makeObservable(this)
  }

  create(name: string) {
	const team = new TeamModel(generateId(), name)
	return this.push(team)
  }

  getById(id: string): TeamModel {
	return this.teams.find(team => team.id === id);
  }

  getByName(name: string): TeamModel {
	return this.teams.find(team => team.name === name);
  }

  @action
  push(team: TeamModel): void {
	this.teams.push(team)
  }

  isUniqueName(name: string): boolean {
	return !this.getByName(name)
  }

  isValidName(name: string) {
	return name && name.length > 2
  }

  @action
  remove(id: string): void {
	this.teams = [...this.teams.filter(team => team.id !== id)]
  }

  private createTeams(teamsData: TeamModel[]) {
	try {
	  teamsData.map(obj => this.create(obj.name))
	} catch (e) {
	  console.log(e);
	}
  }

  toJson() {
	return this.teams
  }
}

export default TeamsData
