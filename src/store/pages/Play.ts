import Round from "../../models/Round";
import {action, computed, makeObservable, observable} from "mobx";
import {Store} from "../index";
import Api from "../../api";
import {ObservableObjectAdministration} from "mobx/dist/types/observableobject";

class Play {
  private readonly root: Store;
  @observable round: Round = null;


  constructor(root: Store) {
	this.root = root
	makeObservable(this)
  }

  @action
  init = () => {
	this.fetchRound().then(() => {
	  // if (!this.round) {
	  // this.setRound(new Round({
	  //   settings: this.root.data.settings,
	  //   team: this.root.data.teams.activeTeam,
	  // }))
	  // }
	})
  }

  @action
  onStart = () => {
	this.root.data.teams.setNextActive()

	this.createNewRound(this.root.data.teams.activeTeam)
	console.log(this.round);
	this.round.setWord(this.root.data.words.next())
	this.round.run()
  }

  onNextWord = (key: string, value: boolean) => {
	this.round.setWordHistry(key, value)
	this.round.setWord(this.root.data.words.next())
  }

  @action
  setResults = () => {
	this.root.data.teams.setResults(this.round.points)
  }

  @action
  setRound(round) {
	this.round = round
  }

  createNewRound(team) {
	this.setRound(new Round({
	  settings: this.root.data.settings,
	  team: team,
	}))
  }

  saveRound() {
	Api.saveRound({
	  activeRound: this.round
	})
  }

  fetchRound() {
	return Api.getState().then(res => {
	  // autorun(() => {
	  // Api.saveRound({
	  //   activeRound: this.round
	  // })
	  // })
	  console.log(res);
	  // if (res?.activeRound) {
	  // const round = new Round(res.activeRound)
	  // this.setRound(round)
	  // }
	})
  }

}

export default Play
