import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {action, makeAutoObservable, makeObservable, observable} from "mobx";
import {Store} from "../store";
import {observer} from "mobx-react";

type IProps = {
  store: Store,
  children: any,
}

const PageInit = ({children, store}: IProps) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
	store.init().then(() => {
	  setLoading(false)
	})
  }, [])
  if (loading) return <div>'Loading data...'</div>
  return (
	<>
	  {children}
	</>
  )
}

export default (PageInit)
