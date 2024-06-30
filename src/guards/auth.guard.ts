import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppErrorService } from 'src/modules/error/error.service';
import { JwtService } from 'src/service/jwt-service/jwt-service.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appErrorService: AppErrorService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.appErrorService.throwUnauthorizedError('No token provided');
    }

    const validToken = this.jwtService.verifyToken(token);
    if (!validToken) {
      this.appErrorService.throwUnauthorizedError('Invalid token');
    }

    request.user = validToken;
    return true;
  }

  private extractTokenFromHeader(request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null;
    }
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' && token ? token : null;
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxYjAyOGNkLTRkNmMtNGJiZi1iMzBkLTViODFmZjM4MGNkNCIsImVtYWkiOiJuaWdodGRldmlscHRAZ21haWwuY29tIiwidG9rZW5UaW1lIjoxNzE5NzI5NjY3MTE2LCJpYXQiOjE3MTk3Mjk2NjcsImV4cCI6MTcxOTczMzI2N30.1QOveCLNGOmaPo4XZV8IH_mgxpzVBebeXJKxfwRoM5k