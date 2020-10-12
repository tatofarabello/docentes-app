import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  private path = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }
  public getAulas() {
    return this.httpClient.get(this.path + '/aulas')
    }

}
