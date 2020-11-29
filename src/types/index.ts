import TeamsPage from "../store/pages/Teams";

export interface IStore {
  pages: {
	teams: TeamsPage
  }
}

export interface ITeamsData {
  push: (team: ITeamItem) => void
  remove: (id: string) => void
  getById: (id: string) => ITeamItem
}

export interface ITeamItem {
  readonly id: string
  name: string
}
