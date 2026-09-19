import {
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication
} from '@azure/msal-browser';

import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';


// ==========================================
// MICROSOFT ENTRA ID
// ==========================================

export const TENANT_ID =
  '57458e82-0b61-48fc-be10-b32db016205e';

export const FRONTEND_CLIENT_ID =
  '078c71b4-de2c-43d1-aafd-74a573429b9c';

export const API_CLIENT_ID =
  '981efe19-c5c1-4ca8-8651-f7b54366fc90';

export const API_SCOPE =
  `api://${API_CLIENT_ID}/access_as_user`;


// Backend local por ahora.
// Más adelante lo reemplazaremos por API Gateway.
export const API_BASE_URL =
  'https://rka596njsj.execute-api.us-east-1.amazonaws.com/api';

export const PRODUCTOS_API_BASE_URL =
  'https://rka596njsj.execute-api.us-east-1.amazonaws.com/api';
// ==========================================
// INSTANCIA MSAL
// ==========================================

export function MSALInstanceFactory():
  IPublicClientApplication {

  return new PublicClientApplication({

    auth: {
      clientId: FRONTEND_CLIENT_ID,

      authority:
        `https://login.microsoftonline.com/${TENANT_ID}`,

      redirectUri:
        'http://localhost:4200/',

      postLogoutRedirectUri:
        'http://localhost:4200/'
    },

    cache: {
      cacheLocation:
        BrowserCacheLocation.LocalStorage
    }

  });

}


// ==========================================
// GUARD
// ==========================================

export function MSALGuardConfigFactory():
  MsalGuardConfiguration {

  return {

    interactionType:
      InteractionType.Redirect,

    authRequest: {
      scopes: [
        API_SCOPE
      ]
    },

    loginFailedRoute:
      '/login'

  };

}


// ==========================================
// INTERCEPTOR
// ==========================================

export function MSALInterceptorConfigFactory():
  MsalInterceptorConfiguration {

  const protectedResourceMap =
    new Map<string, Array<string>>();

  protectedResourceMap.set(
    `${API_BASE_URL}/*`,
    [
      API_SCOPE
    ]
  );

  protectedResourceMap.set(
    `${PRODUCTOS_API_BASE_URL}/*`,
    [
      API_SCOPE
    ]
  );
  
  return {

    interactionType:
      InteractionType.Redirect,

    protectedResourceMap

  };

}