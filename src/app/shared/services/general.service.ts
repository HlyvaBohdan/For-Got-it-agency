import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) {
  }

  getJSONRooms(): Observable<Array<any>> {
    return this.http.get<Array<any>>('/assets/data/rooms.json')
  }

  getJSONForms(): Observable<Array<any>> {
    return this.http.get<Array<any>>('/assets/data/consent-forms.json')
  }

  getJSONTabs(form_name): Observable<Array<any>> {
    return this.http.get<Array<any>>(`/assets/data/consent-form-details/${form_name}.json`)
  }

}
