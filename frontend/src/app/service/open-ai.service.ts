import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRequest, ChatResponse } from '../../../../common/types/chat';
import { UserRegistRequest, UserRegistResponse } from '../../../../common/types/user';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  constructor(private httpClient: HttpClient) {}

  sendChat(req: ChatRequest): Observable<ChatResponse> {
    return this.httpClient.post<ChatResponse>(`${environment.apiUrl}/chat`, req);
  }

  reset(): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/reset`, {}, { responseType: 'text' });
  }

  // ユーザ情報設定
  userRegist(req: UserRegistRequest): Observable<UserRegistResponse> {
    return this.httpClient.post<UserRegistResponse>(`${environment.apiUrl}/user`, req);
  }
}
