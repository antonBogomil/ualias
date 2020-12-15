import TeamsPage from "./Teams";
import {Store} from "../";
import Play from "./Play";


export default class Pages {
  private readonly root: Store;
  readonly teams: TeamsPage;
  readonly play: Play;

  constructor(root: Store) {
	this.root = root
	this.teams = new TeamsPage(root)
	this.play = new Play(root)
  }

}
