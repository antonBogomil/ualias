import TeamModel from "../models/Team";
import Round from "../models/Round";

export type Words = string[]
export type Teams = TeamModel[]


export type State = {
  activeRound: Round,
}
