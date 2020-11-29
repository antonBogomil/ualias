import TeamModel from "../../../models/Team";
import {generateId} from "../../../tools";
import {Store} from "../../index";
import {action, makeObservable, observable} from "mobx";
import Api from "../../../api";


class TeamsData {
  private readonly root: Store;
  @observable teams: TeamModel[];


  constructor(root: Store) {
	this.teams = []
	this.root = root
	makeObservable(this)
  }

  init() {
	this.fetch()
  }

  private fetch = async () => {
	const res = await Api.getTeams()
	res && res.map((item) => {
	  this.push(new TeamModel(item.id, item.name))
	})
  }


  save = async () => {
	return Api.saveTeams(this.teams)
  }


  getTeams() {
	return this.teams
  }

  create(name: string, id: string = generateId()) {
	const team = new TeamModel(id, name)
	this.push(team)
	this.save()
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

}

export default TeamsData
