import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  GoneException,
  ImATeapotException,
  MethodNotAllowedException,
  NotAcceptableException,
  RequestTimeoutException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

@Injectable()
export class AppErrorService {
  throwNotFoundError(message: string) {
    throw new NotFoundException(message);
  }

  throwBadRequestError(message: string) {
    throw new BadRequestException(message);
  }

  throwInternalServerError(message: string) {
    throw new InternalServerErrorException(message);
  }

  throwUnauthorizedError(message: string) {
    throw new UnauthorizedException(message);
  }

  throwForbiddenError(message: string) {
    throw new ForbiddenException(message);
  }

  throwConflictError(message: string) {
    throw new ConflictException(message);
  }

  throwGoneError(message: string) {
    throw new GoneException(message);
  }

  throwTeapotError(message: string) {
    throw new ImATeapotException(message);
  }

  throwMethodNotAllowedError(message: string) {
    throw new MethodNotAllowedException(message);
  }

  throwNotAcceptableError(message: string) {
    throw new NotAcceptableException(message);
  }

  throwRequestTimeoutError(message: string) {
    throw new RequestTimeoutException(message);
  }

  throwUnsupportedMediaTypeError(message: string) {
    throw new UnsupportedMediaTypeException(message);
  }

  // Add more methods for other error types as needed
}
