import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { UsersService } from 'src/app/users/users.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private userService: UsersService) {}

  //count = 0;
  //retryCount = 1;
  //retryWaitMilliSeconds = 1000;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const validatedRequest = this.setAuthenticationHeader(
      request.headers.has('Authorization') && !request.headers.has('external'),
      request
    );
    //? Handle response
    return next.handle(validatedRequest).pipe(
      //? Vamos a observar que contiene las peticiones erroneas
      catchError((err: any) => {
        return this.handleRequestError(err, validatedRequest, next);
      })
    );
  }

  //* Metodo encargado de configurar el encabezado de peticion *//
  private setAuthenticationHeader(
    isAuth: boolean,
    request: HttpRequest<any>,
    awsToken?: string
  ): HttpRequest<any> {
    //? Esta es la validacion mediante una bandera que nos indica que debemos usar autenticacion BEARER
    if (isAuth) {
      //? Obtiene el token por parametro o por defecto el tenemos guardado
      const aws_token = awsToken || this.userService.token;
      let constAuticacion = `Bearer ${aws_token}`;
      //? Utilizamos la composicion de doble token Cognito + Gently para la validacion de seguridad en casi todos las peticiones
      const headers = new HttpHeaders({
        Authorization: constAuticacion,
      });
      //? Actualizamos el request mediante un nuevo objeto en el metodo clone
      const authRequest = request.clone({ headers });
      return authRequest;
    }

    if (request.headers.has('external')) {
      const headers = new HttpHeaders({
        Authorization: request.headers.get('Authorization') || '',
      });

      const authRequest = request.clone({ headers });
      return authRequest;
    }

    return request;
  }

  //* Metodo encargardo de procesar las peticiones según su estado *//
  private handleRequestError(
    err: any,
    authRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    //? Vamos a validar si la respuesta contiene algun error por vencimiento de token
    if (err instanceof HttpErrorResponse && err.status === 401) {
      //? Se refrescan los tokens y se entrega un request actualizado
      // return this.refreshRequestToken(authRequest).pipe(
      //   switchMap((request) => {
      //     return next.handle(request);
      //   }),
      //   catchError((e) => {
      //     console.log(e);
      //     if (e.status !== 401) {
      //       console.log('error en generacion de token no autorizada');
      //     } else {
      //       console.log('error en generacion de token');
      //     }
      //     return throwError(() => e);
      //   })
      // );
      //this.router.navigate(['/login']);
    }
    //? Se maneja el error naturalmente
    return throwError(() => err);
  }

  //* Refresca el token y modifica la autorizacion de la peticion *//
  // refreshRequestToken(req: HttpRequest<any>): Observable<any> {
  //   return from(
  //     this.coreService
  //       .refreshTokens() //? Se refresca todos los tokens
  //       .then((response: any) => {
  //         const jwt = response.getAccessToken().getJwtToken();
  //         //? Se reescribe la peticion con el nuevo token
  //         return this.setAuthenticationHeader(true, req, jwt);
  //       })
  //   );
  // }
}
