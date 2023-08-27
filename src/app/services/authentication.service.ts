import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  authenticateUser(username: string, password: string): Promise<boolean> {
    return fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((users: any[]) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          this.setBearerToken('mocked_token'); // Simulate setting a token
          return true; // Authentication successful
        } else {
          return false; // Authentication failed
        }
      })
      .catch((error) => {
        console.error('Authentication error:', error);
        return false;
      });
  }

  setBearerToken(token: string) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(): boolean {
    return !!this.getBearerToken(); // Return true if token exists
  }
}
