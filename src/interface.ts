import { JwtPayload } from 'jsonwebtoken';
import { History } from './modules/history/entities/history.entity';
import { Profile } from './modules/profiles/entities/profile.entity';

export interface RequestWithUser extends Request {
  user: JwtPayload;
}

export interface BaseResponse {
  message: string;
}

export interface loginResponse extends BaseResponse {
  jwt: string;
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

  ProfileCreatedEvent='ProfileCreatedEvent',
  ProfileUpdatedEvent='ProfileUpdatedEvent'
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export interface ProfileResponse extends BaseResponse {
  data: Profile;
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxYjAyOGNkLTRkNmMtNGJiZi1iMzBkLTViODFmZjM4MGNkNCIsImVtYWkiOiJuaWdodGRldmlscHRAZ21haWwuY29tIiwidG9rZW5UaW1lIjoxNzE5OTY2NDA1ODkyLCJpYXQiOjE3MTk5NjY0MDUsImV4cCI6MTcxOTk3MDAwNX0.q1zTrVm_dC2sK0HgVJtlPECIc_sEP5f8DzNjiWINvSQ