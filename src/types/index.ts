import {Store} from "../store";
import {History} from 'history'

export interface ITeamsData {
  push: (team: ITeamItem) => void
  remove: (id: string) => void
  getById: (id: string) => ITeamItem
}

export interface ITeamItem {
  readonly id: string
  name: string
}


export interface IHistory extends History {

}

export interface RootRouteProps {
  store: Store,
  history: IHistory
}
