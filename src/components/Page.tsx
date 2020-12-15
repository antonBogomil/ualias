import React, {ReactNode} from 'react';
import {observer} from "mobx-react";

const styles = require('../styles/main.scss')

interface IProps {
  children: ReactNode
}

const Page = observer(({children}: IProps) => {
  return (
	<div className={styles.page}>
	  <div className={styles.wrapper}>
		{children}
	  </div>
	</div>
  );
});

export default Page;
