import {
  Component
} from '@angular/core';

import {
  MsalService
} from '@azure/msal-angular';

import {
  API_SCOPE
} from '../../core/auth/auth.config';


@Component({

  selector: 'app-login',

  templateUrl:
    './login.html',

  styleUrl:
    './login.css'

})

export class Login {

  constructor(
    private authService: MsalService
  ) {}


  login(): void {

    this.authService
      .loginRedirect({

        scopes: [
          API_SCOPE
        ]

      });

  }

}