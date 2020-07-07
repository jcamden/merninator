export interface ExtraQueryParams {
  authuser: string;
}

export interface SessionState {
  extraQueryParams: ExtraQueryParams;
}

export interface Wc {
  token_type: string;
  access_token: string;
  scope: string;
  login_hint: string;
  expires_in: number;
  id_token: string;
  session_state: SessionState;
  first_issued_at: number;
  expires_at: number;
  idpId: string;
}

export interface Rt {
  WU: string;
  Bd: string;
  AW: string;
  AU: string;
  dL: string;
  Bu: string;
}

export interface ExtraQueryParams2 {
  authuser: string;
}

export interface SessionState2 {
  extraQueryParams: ExtraQueryParams2;
}

export interface TokenObj {
  token_type: string;
  access_token: string;
  scope: string;
  login_hint: string;
  expires_in: number;
  id_token: string;
  session_state: SessionState2;
  first_issued_at: number;
  expires_at: number;
  idpId: string;
}

export interface ProfileObj {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
}

export interface RootObject {
  Ea: string;
  wc: Wc;
  Rt: Rt;
  googleId: string;
  tokenObj: TokenObj;
  tokenId: string;
  accessToken: string;
  profileObj: ProfileObj;
}
