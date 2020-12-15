import React, {useCallback, useMemo} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import {ErrorCodes, errorMessages} from "../../constants/teams";
import {t} from "../../store/dictionary";
import {observer} from "mobx-react";

type IProps = {
  isOpen: boolean,
  name: string,
  errors: ErrorCodes[]

}

const TeamsCreateModal = observer(({isOpen, name, errors, handleClose, handleSave, handleChange}) => {
  const handleSaveClick = (e: React.SyntheticEvent) => {
	handleSave(name)
  }
  const errorString = useMemo(() => errors.map(code => `${errorMessages[code]} `), [errors])
  return (
	<Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
	  <DialogTitle id="form-dialog-title">{t('')}</DialogTitle>
	  <DialogContent>
		<DialogContentText>
		  {t('TEAM_NAME_PLACEHOLDER')}
		</DialogContentText>
		<TextField
		  autoFocus
		  error={!!errors.length}
		  margin="dense"
		  id="name"
		  label={t('LABEL_TEAM')}
		  type="text"
		  helperText={errorString}
		  fullWidth
		  onChange={handleChange}
		  value={name}
		/>
	  </DialogContent>
	  <DialogActions>
		<Button onClick={handleClose} color="secondary">
		  {t('CANCEL')}
		</Button>
		<Button onClick={handleSaveClick} color="primary">
		  {t('SAVE')}
		</Button>
	  </DialogActions>
	</Dialog>
  );
});

export default TeamsCreateModal;
