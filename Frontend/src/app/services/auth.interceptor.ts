import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('authToken');
  
  // The base URL of your own backend API
  const backendApiUrl = 'http://localhost:5000/api'; 

  // Check if the request is going to your backend API
  const isApiRequest = req.url.startsWith(backendApiUrl);

  // Only add the token to requests going to your API and if a token exists
  if (authToken && isApiRequest) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next(clonedReq);
  }

  // For all other requests (like to Google Books), send them without modification
  return next(req);
};