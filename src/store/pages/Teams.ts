import {action, computed, makeObservable, observable} from "mobx";
import TeamsData from "../data/teams";
import {Store} from "../index";
import TeamModel from "../../models/Team";
import React from "react";
import {ErrorCodes} from "../../constants/teams";

class TeamsPage {
  // readonly root: Store
  readonly data: TeamsData;
  @observable name: string
  @observable isOpenModal: boolean
  @observable errors: Map<string, boolean> = new Map()

  constructor(teamsData: TeamsData, initialData: TeamModel[]) {
	this.data = teamsData
	this.isOpenModal = false
	this.name = 'Молодая команда'
	makeObservable(this)
  }


  @computed
  get isReady() {
	return this.data.teams.length >= 2
  }

  @computed
  get isValid() {
	return !this.errors.size
  }

  @computed
  get list() {
	return this.data.teams
  }

  @computed
  get errorsKeys() {
	return Array.from(this.errors.keys())
  }


  handleCreate = (name: string) => {
	this.validate(name)
	if (this.isValid) {
	  this.reset()
	  this.data.create(name)
	}
  }


  @action
  validate(name): boolean {
	this.resetErrors()
	const errors = this.getValidationErrors(name)
	if (!errors.length) return true
	else {
	  errors.map(error => this.setErrors(error))
	  return false
	}
  }


  getValidationErrors(name): ErrorCodes[] {
	const checkList = [
	  {
		key: ErrorCodes.NAME_LENGTH,
		isValid: this.data.isValidName(name)
	  },
	  {
		key: ErrorCodes.NAME_EXIST,
		isValid: this.data.isUniqueName(name)
	  },
	]
	return checkList
	  .filter((item) => {
		return !item.isValid && item.key
	  })
	  .map(item => item.key)
  }

  @action
  setErrors(key: string) {
	this.errors.set(key, true)
  }


  @action
  handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
	this.name = e.currentTarget.value
  }

  handleRemove = (id: string) => {
	this.data.remove(id)
  }

  @action handleCancel = () => {
	this.handleToggleModal()
	this.name = ''
  }


  @action
  reset() {
	this.name = ''
	this.resetErrors()
  }

  @action
  resetErrors() {
	this.errors = new Map()
  }

  @action
  handleToggleModal = () => {
	this.isOpenModal = !this.isOpenModal
  }


}

export default TeamsPage

