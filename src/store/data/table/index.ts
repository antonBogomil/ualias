import TeamModel from "../../../models/Team";
import {action, observable} from "mobx";

export class TableRecord {
  readonly team: TeamModel = null

  @observable private points: number = 0
  @observable private playedTimes: number = 0

  constructor(team: TeamModel) {
	this.team = team
  }

  getPoints() {
	return this.points
  }

  getPlayedTimes() {
	return this.playedTimes
  }

  @action
  setPoints(points: number) {
	this.points = points
  }

  @action
  setPlayedTimes(n: number = 1) {
	this.playedTimes += n
  }
}

export default class Table {
  @observable records: TableRecord[] = []

  constructor(teams: TeamModel[]) {
	this.createRecords(teams)
  }

  @action
  private createRecords(teams: TeamModel[]) {
	this.records = teams.map(team => new TableRecord(team))
  }
}
