export interface IServerDomains {
    [key: string]: IServerUrls;
}

export interface IServerUrls {
    serverPrimaryUrls: string[];
    serverSecondaryUrls: string[];
    serverMiniGamePrimaryUrls: string[];
    serverMiniGameWebsocketUrl: string;
    serverWebsocketUrl: string;
    serverMaintenanceUrl: string;
    serverAssetsUrl: string;
}
