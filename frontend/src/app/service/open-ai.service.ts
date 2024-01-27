import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRequest, ChatResponse } from '../../../../common/types/chat';
import { DiscussionRequest, DiscussionResponse } from '../../../../common/types/discussion';
import { GetSettingResponse } from '../../../../common/types/setting';
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

  // 設定取得
  getSetting(): Observable<GetSettingResponse> {
    return this.httpClient.post<GetSettingResponse>(`${environment.apiUrl}/setting`, {});
  }

  // 質問の回答送信
  discuss(req: DiscussionRequest): Observable<DiscussionResponse> {
    return this.httpClient.post<DiscussionResponse>(`${environment.apiUrl}/discussion`, req);
  }
}
