import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Actor } from '@shared/interfaces/actor.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  constructor(
    private http: HttpClient
  ) { }

  public getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(`${environment.apiUrl}/actors`);
  }

  public getActor(id: number): Observable<Actor> {
    return this.http.get<Actor>(`${environment.apiUrl}/actors/${id}`);
  }

  public addActor(params: Actor): Observable<Actor> {
    return this.http.post<Actor>(`${environment.apiUrl}/actors`, params);
  }

  public updateActor(actor: Actor, id: number): Observable<Actor>{
    return this.http.patch<Actor>(`${environment.apiUrl}/actors/${id}`, actor);
  }

  public deleteActor(id: number): Observable<Actor> {
    return this.http.delete<Actor>(`${environment.apiUrl}/actors/${id}`);
  }
}
