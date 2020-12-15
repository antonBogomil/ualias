import TeamModel from "../../../models/Team";
import {generateId} from "../../../tools";
import {Store} from "../../index";
import {action, autorun, computed, makeObservable, observable, toJS} from "mobx";
import Api from "../../../api";


class TeamsData {
  private readonly root: Store;
  @observable private teams: TeamModel[];
  @observable activeTeam: TeamModel = null

  constructor(root: Store) {
	this.teams = []
	this.root = root
	makeObservable(this)
  }

  @action
  async init() {
	const fetchTeams = async () => {
	  const res = await Api.getTeams()
	  res && res.map((item) => {
		this.push(new TeamModel(item))
	  })
	}

	const fetchActive = async () => {
	  const res = await Api.getActiveTeam()
	  this.setActive(res?.team || null)
	}

	fetchActive().then(() => {
	  autorun(() => {
		Api.saveActiveTeam(this.activeTeam)
	  })
	})
	fetchTeams().then(() => {
	  autorun(() => {
		Api.saveTeams(this.teams)
	  })
	})
  }


  getTeams() {
	return this.teams
  }

  create(name: string, id: string = generateId()) {
	const team = new TeamModel({id, name})
	this.push(team)
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

  get isEmpty() {
	return this.teams.length === 0
  }


  @action
  setActive(team: TeamModel) {
	this.activeTeam = team
  }

  setNextActive() {
	this.setActive(this.nextActive)
  }


  setResults(points: number) {
	const team = this.getById(this.activeTeam.id)
	team.setPoints(team.points + points)
	team.setRounts(++team.rounds)
	this.teams = [...this.teams]
  }

  @computed
  get nextActive() {
	if (this.isEmpty) return null
	if (!this.activeTeam) {
	  return this.teams[0]
	} else {
	  const currentIndex = this.teams.indexOf(this.getById(this.activeTeam.id))
	  const nextIndex = currentIndex + 1
	  if ((nextIndex) > (this.teams.length - 1)) {
		return this.teams[0]
	  } else {
		return this.teams[nextIndex]
	  }
	}
  }

  @action
  reset() {
	this.setActive(null)
	this.teams = []
  }

}

export default TeamsData
