import React from 'react';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {ButtonProps} from '@material-ui/core/Button';

type IProps = { to: string } & ButtonProps

const style = {
  textDecoration: 'none',
  color: '#fff',
  display: 'inline-block',
  // width: '100%',
}

const ButtonLink = ({children, to, ...rest}: IProps) => {
  if (rest.disabled) return (
	<a style={style}>
	  <Button  {...rest}>
		{children}
	  </Button>
	</a>
  )
  return (
	<Link style={style} to={to}>
	  <Button {...rest}>
		{children}
	  </Button>
	</Link>

  );
};

export default ButtonLink;
