import React from "react";

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

type IProps = {
  isOpen: boolean,
  handleClose: () => void,
  title: string,
  renderActions: JSX.Element,
  children: React.ReactNode
}

export default function Modal({isOpen, handleClose, title, renderActions, children}: IProps) {
  return (
	<Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
	  <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
	  <DialogContent>
		{title && <DialogContentText>{title}</DialogContentText>}
		{children}
	  </DialogContent>
	  <DialogActions>
		{renderActions}
	  </DialogActions>
	</Dialog>
  )
}
