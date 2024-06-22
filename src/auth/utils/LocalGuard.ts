import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('pass one LocalAuthGuard');
    try {
      const result = (await super.canActivate(context)) as boolean;
      console.log('pass two LocalAuthGuard' );
      if (result) {
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
      }
      return result;
    } catch (error) {
      console.error('Error during authentication', error);
      throw new UnauthorizedException();
    }
  }
}

@Injectable()
export class AuthenticatedGaurd implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated();
        
    }
}