import * as React from 'react';

const styles = require('./styles.scss')
const FooterWrapper = ({children}) => {
  return (
	<div className={styles.root}>
	  {children}
	</div>
  );
};

export default FooterWrapper;
