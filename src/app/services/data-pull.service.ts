import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Member } from '../entities/member';
import { Organization } from '../entities/organization';
import { Repository } from '../entities/repository';
import { Team } from '../entities/team';

@Injectable()
export class DataPullService {

  gitStalkerURL: string = 'http://localhost:8080/';

  constructor(private _http: HttpClient) { }

  /**
   *
   * GET Request to the correct REST endpoint and receive appropriate data.
   * @param organizationName
   */
  requestOrganization(organizationName: string): Observable<HttpResponse<Organization>> {
    const requestURL = this.gitStalkerURL + 'organizationdetail' + '/' + organizationName;
    console.log('ORGANIZATION DATA REQUESTED');
    return this._http.get<Organization>(
      requestURL, { observe: 'response' }).pipe(
        catchError(this.handleError)
      );
  }

  requestMembers(organizationName: string): Observable<HttpResponse<Member[]>> {
    const requestURL = this.gitStalkerURL + 'members' + '/' + organizationName;
    console.log('MEMBER DATA REQUESTED');
    return this._http.get<Member[]>(
      requestURL, { observe: 'response' }).pipe(
        catchError(this.handleError)
      );
  }

  requestRepositories(organizationName: string): Observable<HttpResponse<Repository[]>> {
    const requestURL = this.gitStalkerURL + 'repositories' + '/' + organizationName;
    console.log('REPOSITORY DATA REQUESTED');
    return this._http.get<Repository[]>(
      requestURL, { observe: 'response' }).pipe(
        catchError(this.handleError)
      );
  }

  requestMemberRepositories(organizationName: string): Observable<[Repository[]]> {
    const requestURL = this.gitStalkerURL + 'createdreposbymembers' + '/' + organizationName;
    console.log('MEMBER REPOSITORY DATA REQUESTED');
    return this._http.get<[Repository[]]>(requestURL);
  }

  requestTeams(organizationName: string): Observable<HttpResponse<Team[]>> {
    const requestURL = this.gitStalkerURL + 'teams' + '/' + organizationName;
    console.log('TEAM DATA REQUESTED');
    return this._http.get<Team[]>(
      requestURL, { observe: 'response' }).pipe(
        catchError(this.handleError)
      );
  }

  requestExternalRepositories(organizationName: string): Observable<Repository[]> {
    const requestURL = this.gitStalkerURL + 'externalrepositories' + '/' + organizationName;
    console.log('EXTERNAL REPOSITORY DATA REQUESTED');
    return this._http.get<Repository[]>(requestURL);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(error);
  }

}

