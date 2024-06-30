import { JwtPayload } from 'jsonwebtoken';
import { History } from './modules/history/entities/history.entity';

export interface RequestWithUser extends Request {
  user: JwtPayload;
}

export interface BaseResponse {
  message: string;
}

export interface loginResponse extends BaseResponse{
  jwt:string;
}

export interface GetEntityResponse {
  data: History[] | [];
  meta: {
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
    totalResults: number;
    totalPages: number;
  };
}

export enum EventTypesEnum {
  UserCreatedEvent = 'UserCreatedEvent',
  UserVerifiedEvent = 'UserVerifiedEvent',
  UserLoginedEvent = 'UserLoginedEvent',
  UserPasswordUpdatedEvent = 'UserPasswordUpdatedEvent',
  UserPasswordUpdateRequestEvent = 'UserPasswordUpdateRequestEvent',
}
