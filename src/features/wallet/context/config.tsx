import { Activity } from '../pages'
import { GasFee } from '../pages/GasFee'
import { TransactionInfo } from '../pages/Transaction'

export enum WalletManager {
  Notification = 'notification',
  Activity = 'activity',
}

export const WALLET_PAGES = {
  [WalletManager.Activity]: {
    routes: [
      { path: '/activity', component: Activity },
      { path: '/activity/:hash', component: TransactionInfo },
      { path: '/activity/notification/:type', component: Activity },
      { path: '/activity/notification/:hash/gas', component: GasFee },
      { path: '/activity/notification/:hash/cancel', component: Activity },
    ],
  },
  [WalletManager.Notification]: { routes: [] },
}
