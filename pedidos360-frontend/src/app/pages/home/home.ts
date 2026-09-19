import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  MsalService
} from '@azure/msal-angular';

import {
  API_SCOPE
} from '../../core/auth/auth.config';


@Component({

  selector: 'app-home',

  templateUrl:
    './home.html',

  styleUrl:
    './home.css'

})

export class Home implements OnInit {

  usuario = '';

  audience = '';

  issuer = '';

  scope = '';

  roles: string[] = [];

  expiracion = '';


  constructor(
    private authService: MsalService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    const account =
      this.authService.instance
        .getActiveAccount()
      ??
      this.authService.instance
        .getAllAccounts()[0];


    if (!account) {
      return;
    }


    this.usuario =
      account.username;


    this.authService
      .acquireTokenSilent({

        account,

        scopes: [
          API_SCOPE
        ]

      })
      .subscribe({

        next: (result) => {

          const claims =
            this.decodeJwt(
              result.accessToken
            );


          console.log(
            'ACCESS TOKEN CLAIMS:',
            claims
          );


          this.audience =
            claims.aud ?? '';

          this.issuer =
            claims.iss ?? '';

          this.scope =
            claims.scp ?? '';

          this.roles =
            claims.roles ?? [];


          if (claims.exp) {

            this.expiracion =
              new Date(
                claims.exp * 1000
              ).toLocaleString();

          }

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error obteniendo Access Token:',
            error
          );

        }

      });

  }


  logout(): void {

    this.authService
      .logoutRedirect({

        postLogoutRedirectUri:
          'http://localhost:4200/'

      });

  }


  private decodeJwt(
    token: string
  ): any {

    const base64Url =
      token.split('.')[1];

    const base64 =
      base64Url
        .replace(/-/g, '+')
        .replace(/_/g, '/');


    const padded =
      base64.padEnd(
        base64.length +
        (4 - base64.length % 4) % 4,
        '='
      );


    const bytes =
      Uint8Array.from(
        atob(padded),
        char =>
          char.charCodeAt(0)
      );


    const json =
      new TextDecoder()
        .decode(bytes);


    return JSON.parse(json);

  }

}