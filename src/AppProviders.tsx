import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { DefiManagerProvider } from 'features/defi/contexts/DefiManagerProvider/DefiManagerProvider'
import { NativeWallet } from 'features/wallet'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ScrollToTop } from 'Routes/ScrollToTop'
import { AppProvider } from 'context/AppProvider/AppContext'
import { AuthorizationProvider } from 'context/AuthorizationProvider/AuthorizationProvider'
import { BrowserRouterProvider } from 'context/BrowserRouterProvider/BrowserRouterProvider'
import { I18nProvider } from 'context/I18nProvider/I18nProvider'
import { MarketDataProvider } from 'context/MarketDataProvider/MarketDataProvider'
import { ModalProvider } from 'context/ModalProvider/ModalProvider'
import { PluginProvider } from 'context/PluginProvider/PluginProvider'
import { ProfileProvider } from 'context/ProfileProvider/ProfileProvider'
import { TransactionsProvider } from 'context/TransactionsProvider/TransactionsProvider'
import { KeepKeyProvider } from 'context/WalletProvider/KeepKeyProvider'
import { WalletProvider } from 'context/WalletProvider/WalletProvider'
import { SplashScreen } from 'pages/SplashScreen/SplashScreen'
import { persistor, store } from 'state/store'
import { theme } from 'theme/theme'

type ProvidersProps = {
  children: React.ReactNode
}

export function AppProviders({ children }: ProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <PluginProvider>
        <ChakraProvider theme={theme}>
          <ColorModeScript />
          <PersistGate loading={<SplashScreen />} persistor={persistor}>
            <HashRouter basename='/'>
              <ScrollToTop />
              <BrowserRouterProvider>
                <I18nProvider>
                  <WalletProvider>
                    <KeepKeyProvider>
                      <AuthorizationProvider>
                        <ProfileProvider>
                          <ModalProvider>
                            <NativeWallet />
                            <TransactionsProvider>
                              <AppProvider>
                                <MarketDataProvider>
                                  <DefiManagerProvider>{children}</DefiManagerProvider>
                                </MarketDataProvider>
                              </AppProvider>
                            </TransactionsProvider>
                          </ModalProvider>
                        </ProfileProvider>
                      </AuthorizationProvider>
                    </KeepKeyProvider>
                  </WalletProvider>
                </I18nProvider>
              </BrowserRouterProvider>
            </HashRouter>
          </PersistGate>
        </ChakraProvider>
      </PluginProvider>
    </ReduxProvider>
  )
}
