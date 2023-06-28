export enum typeConnect {
  Disconnected,
  Connected
}

export interface wsState {
  connect: typeConnect;
  url: string;
}
