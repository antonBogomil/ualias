import * as React from 'react';
import Page from "../../components/Page";
import {withStore} from "../../tools";
import {PostRoundComponent, PreRoundComponent} from "./components";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {paths} from "../../constants";
import GamePanel from "./GamePanel";
import Play from "store/pages/Play";
import TeamModel from "../../models/Team";
import RoundStore from "../../models/Round";

interface IProps extends RouteComponentProps<any> {
  store?: Play,
  team: TeamModel,
}

class Playing extends React.Component<IProps> {
  componentDidMount() {
	if (this.props.team) {
	  this.props.store.init()
	} else {
	  this.props.history.push(paths.TEAMS)
	}
  }

  componentWillUnmount() {
	this.props.store.setRound(null)
  }

  onRoundEnd = () => {
	this.props.store.setResults()
	this.props.history.push(paths.TABLE)
  }


  render() {
	const {
	  round,
	  onStart,
	  onNextWord,
	} = this.props.store
	return (
	  <Page>
		{round ?
		  <>
			{round.isTimeout ?
			  <PostRoundComponent
				onClick={this.onRoundEnd}
				onChange={round.setWord}
				points={round.points}
				results={round.results}
			  />
			  : <GamePanel
				points={round.points}
				time={round.time}
				onChange={onNextWord}
				isPause={round.isPaused}
				onPause={round.setPause}
				word={round.word}
			  />
			}
		  </>
		  :
		  <>
			<PreRoundComponent
			  team={this.props.team}
			  onStart={onStart}
			/>
		  </>
		}
	  </Page>
	);
  }
}

const PlayingWtihStore = withStore(
  (store) => ({
	store: store.pages.play,
	team: store.data.teams.nextActive,
  }))(Playing);
const PlayingWtihStoreReuter = withRouter(PlayingWtihStore)
export default PlayingWtihStoreReuter
