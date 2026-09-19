import {
  Component,
  OnInit
} from '@angular/core';

import {
  Router,
  RouterOutlet
} from '@angular/router';

import {
  MsalService
} from '@azure/msal-angular';


@Component({

  selector: 'app-root',

  imports: [
    RouterOutlet
  ],

  templateUrl:
    './app.html',

  styleUrl:
    './app.css'

})

export class App implements OnInit {

  constructor(
    private authService: MsalService,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.authService
      .handleRedirectObservable()
      .subscribe({

        next: (result) => {

          if (result?.account) {

            this.authService.instance
              .setActiveAccount(
                result.account
              );

            this.router.navigate([
              '/home'
            ]);

            return;
          }


          const activeAccount =
            this.authService.instance
              .getActiveAccount();


          if (!activeAccount) {

            const accounts =
              this.authService.instance
                .getAllAccounts();


            if (accounts.length > 0) {

              this.authService.instance
                .setActiveAccount(
                  accounts[0]
                );

            }

          }

        },

        error: (error) => {

          console.error(
            'Error procesando autenticación:',
            error
          );

        }

      });

  }

}