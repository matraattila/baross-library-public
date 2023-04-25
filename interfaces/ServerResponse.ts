import { UserApp } from './User'

export interface ErrorResponse {
  message?: string
}

export interface SuccessResponse {
  user: UserApp
  message: string
}
