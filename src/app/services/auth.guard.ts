import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

constructor(private auth: AuthService, private router: Router){}

  canActivate(): Observable<boolean> {

    return this.auth.isAuth().pipe(
      tap( status => {
        if(!status){this.router.navigate(['/login'])}
      } )
    )
  }

  canLoad():Observable<boolean> {
    return this.auth.isAuth().pipe(
      tap( status => {
        if(!status){this.router.navigate(['/login'])}
      } ),
      take(1)
    )
  }

}
