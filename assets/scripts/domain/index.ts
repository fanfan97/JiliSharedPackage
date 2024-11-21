import { _decorator, Component, Node } from 'cc';
import { serverUrlsProd } from './utils/domains';

export const GAME_TABLE_ID = 81;
export const GAME_MARKET_TYPE = 35;
export const GAME_SECRET_KEY = 'aBeM4j%7j#k2K4!lK*)&HiT&F567F';

export enum GAME_ENVIRONMENT_ENUM {
  development = 'development',
  staging = 'staging',
  production = 'production',
}

export const CONFIG = {
  development: {
    baseHost: 'api-m-test.r4espt.com/',
    r4esptBaseUrl: 'https://vx-dev-api.r4espt.com/',
  },
  staging: {
    baseHost: 'api-m-staging.r4espt.com/',
    r4esptBaseUrl: 'https://staging-api.r4espt.com/',
  },
};

const subDomain = 'api/game-client/';
const subDomainV8 = `${subDomain}v8/`;

const walletEndPointUrl = `wallet/?utm=${GAME_TABLE_ID}`;
const launchEndPointUrl = `game-launch`;

const websockerEndPointUrl = `ws/v2/tables/${GAME_TABLE_ID}/`;
const jackpotEndPointUrl = `mini-game/v2/tables/${GAME_TABLE_ID}/jackpot-list`;
const bestWinEndPointUrl = `mini-game/v2/tables/${GAME_TABLE_ID}/best-win`;
const sessionEndPointUrl = `mini-game/v2/sppf/session/`;

const jiliHistoryEndPointUrl = `jili/history`;
const jiliRulesEndPointUrl = `jili/history/rules`;
const jiliPromoteEndPointUrl = `jili/history/promote`;

const TO_DEV_HOST = [
  'gc-minigame-lab.r4espt.com',
  'gc-minigame-dev.r4espt.com',
  'gc-v7-dev.r4espt.com',
  'gc-v8-dev.r4espt.com',
];
const TO_STAGING_HOST = ['gc-minigame-staging.r4espt.com', 'gc-v7-staging.r4espt.com', 'gc-v8-staging.r4espt.com'];

const getEnvUrls = () => {
  const baseDomain = new URL(window.location.origin);
  const { host } = baseDomain;

  const jiliHistoryUrl = `${baseDomain}${jiliHistoryEndPointUrl}`;
  const jiliRulesUrl = `${baseDomain}${jiliRulesEndPointUrl}`;
  const jiliPromoteUrl = `${baseDomain}${jiliPromoteEndPointUrl}`;

  if (baseDomain.host.includes('localhost') || baseDomain.host.includes('127.0.0.1') || TO_DEV_HOST.includes(host)) {
    const baseUrl = `https://${CONFIG[GAME_ENVIRONMENT_ENUM.development].baseHost}`;
    const r4esptBaseUrl = CONFIG[GAME_ENVIRONMENT_ENUM.development].r4esptBaseUrl;
    return {
      env: GAME_ENVIRONMENT_ENUM.development,
      websocketUrl: `wss://${CONFIG[GAME_ENVIRONMENT_ENUM.development].baseHost}${websockerEndPointUrl}`,
      walletUrl: `${r4esptBaseUrl}${subDomainV8}${walletEndPointUrl}`,
      launchUrl: `${r4esptBaseUrl}${subDomainV8}${launchEndPointUrl}`,
      jackpotListUrl: `${baseUrl}${subDomain}${jackpotEndPointUrl}`,
      bestWinListUrl: `${baseUrl}${subDomain}${bestWinEndPointUrl}`,
      sessionUrl: `${baseUrl}${subDomain}${sessionEndPointUrl}`,
      jiliHistoryUrl: `${baseDomain.host.includes('localhost') || baseDomain.host.includes('127.0.0.1') ? `http://localhost:5173/` : baseDomain}${jiliHistoryEndPointUrl}`,
      jiliRulesUrl: `${baseDomain.host.includes('localhost') || baseDomain.host.includes('127.0.0.1') ? `http://localhost:5173/` : baseDomain}${jiliRulesEndPointUrl}`,
      jiliPromoteUrl: `${baseDomain.host.includes('localhost') || baseDomain.host.includes('127.0.0.1') ? `http://localhost:5173/` : baseDomain}${jiliPromoteEndPointUrl}`,
    };
  } else if (TO_STAGING_HOST.includes(host)) {
    const baseUrl = `https://${CONFIG[GAME_ENVIRONMENT_ENUM.staging].baseHost}`;
    const r4esptBaseUrl = CONFIG[GAME_ENVIRONMENT_ENUM.staging].r4esptBaseUrl;
    return {
      env: GAME_ENVIRONMENT_ENUM.staging,
      websocketUrl: `wss://${CONFIG[GAME_ENVIRONMENT_ENUM.staging].baseHost}${websockerEndPointUrl}`,
      walletUrl: `${r4esptBaseUrl}${subDomainV8}${walletEndPointUrl}`,
      launchUrl: `${r4esptBaseUrl}${subDomainV8}${launchEndPointUrl}`,
      jackpotListUrl: `${baseUrl}${subDomain}${jackpotEndPointUrl}`,
      bestWinListUrl: `${baseUrl}${subDomain}${bestWinEndPointUrl}`,
      sessionUrl: `${baseUrl}${subDomain}${sessionEndPointUrl}`,
      jiliHistoryUrl,
      jiliRulesUrl,
      jiliPromoteUrl,
    };
  }

  const prodDomainKey = Object.keys(serverUrlsProd).find(e=> host.includes(e));
  
  if(!prodDomainKey){
    console.warn(`prodDomainsConfig is undefined with host : ${host}`)
    return {
      env: '',
      websocketUrl: '',
      walletUrl: '',
      launchUrl: '',
      jackpotListUrl: '',
      bestWinListUrl: '',
      sessionUrl: '',
      jiliHistoryUrl: '',
      jiliRulesUrl: '',
      jiliPromoteUrl: '',
    };
  }
  const {serverPrimaryUrls, serverMiniGamePrimaryUrls, serverMiniGameWebsocketUrl, serverAssetsUrl} =  serverUrlsProd[prodDomainKey];

  return {
    env: GAME_ENVIRONMENT_ENUM.production,
    websocketUrl: `${serverMiniGameWebsocketUrl}${websockerEndPointUrl}`,
    walletUrl: `${serverPrimaryUrls[0]}${walletEndPointUrl}`,
    launchUrl: `${serverPrimaryUrls[0]}${launchEndPointUrl}`,
    jackpotListUrl: `${serverMiniGamePrimaryUrls[0]}${jackpotEndPointUrl}`,
    bestWinListUrl: `${serverMiniGamePrimaryUrls[0]}${bestWinEndPointUrl}`,
    sessionUrl: `${serverMiniGamePrimaryUrls[0]}${sessionEndPointUrl}`,
    jiliHistoryUrl,
    jiliRulesUrl,
    jiliPromoteUrl,
  };
};

const {
  env,
  jackpotListUrl,
  walletUrl,
  launchUrl,
  websocketUrl,
  sessionUrl,
  jiliHistoryUrl,
  jiliRulesUrl,
  jiliPromoteUrl,
  bestWinListUrl,
} = getEnvUrls();

console.log(getEnvUrls());

export const GAME_ENV = env;
export const GAME_SESSION_URL_API = sessionUrl;
export const GAME_JACKPOT_LIST_URL_API = jackpotListUrl;
export const GAME_BEST_WIN_LIST_URL_API = bestWinListUrl;
export const GAME_WALLET_URL_API = walletUrl;
export const GAME_LAUNCH_URL_API = launchUrl;
export const GAME_WEBSOCKET_URL = websocketUrl;

export const WEBVIEW_JILI_HISTORY_URL = jiliHistoryUrl;
export const WEBVIEW_JILI_RULE_URL = jiliRulesUrl;
export const WEBVIEW_JILI_PROMOTE_URL = jiliPromoteUrl;
