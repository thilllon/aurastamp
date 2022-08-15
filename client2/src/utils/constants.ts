// export const sessionRefetchIntervalSeconds = 10;
export const sessionRefetchIntervalSeconds = 3 * 60;

// 이 시간 이내로 남은 경우 토큰 갱신
export const refreshTimeMS = 5 * 60 * 1000;

export const githubConnectionMessages = {
  connected: '1',
  failToGetToken: '2',
  failToGetUser: '3',
  failToGetEmail: '4',
  failToConnect: '5',
};
