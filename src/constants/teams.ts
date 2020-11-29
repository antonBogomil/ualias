export enum ErrorCodes {
  NAME_EXIST = 'NAME_EXIST',
  NAME_LENGTH = 'NAME_LENGTH'
}


export const errorMessages = {
  [ErrorCodes.NAME_EXIST]: 'This name already used!',
  [ErrorCodes.NAME_LENGTH]: 'Name too short'
}


