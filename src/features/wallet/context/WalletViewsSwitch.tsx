import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, useMediaQuery } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { RefObject, useEffect, useRef } from 'react'
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { SlideTransition } from 'components/SlideTransition'
import { useOnClickOutside } from 'hooks/useClickOutside/useClickOutside'
import { breakpoints } from 'theme/theme'

import { useNativeWallet } from '../hooks/useNativeWallet/useNativeWallet'
import { Activity } from '../pages'
import { WALLET_PAGES } from './config'
import { NativeWalletActions } from './WalletActionTypes'

interface INativeWalletViewsSwitch {
  btnRef?: RefObject<HTMLButtonElement>
}

export const NativeWalletViewsSwitch = ({ btnRef }: INativeWalletViewsSwitch) => {
  const history = useHistory()
  const location = useLocation()
  const match = useRouteMatch('/')

  const walletRef = useRef<HTMLDivElement | null>(null)

  const [isLargerThanMd] = useMediaQuery(`(min-width: ${breakpoints['md']})`)

  const {
    state: { initialRoute, modal, showBackButton, type },
    dispatch,
  } = useNativeWallet()

  const onClose = async () => {
    history.replace('/')
    dispatch({
      type: NativeWalletActions.SET_NATIVE_WALLET_MODAL,
      payload: false,
    })
  }

  useEffect(() => {
    const toggleEvent = () => {
      dispatch({
        type: NativeWalletActions.TOGGLE_MODAL,
      })
    }

    if (btnRef && btnRef.current) {
      btnRef.current.addEventListener('click', toggleEvent)
    }
    return () => {
      if (btnRef && btnRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        btnRef.current.removeEventListener('click', toggleEvent)
      }
    }
  }, [btnRef, dispatch])

  useOnClickOutside(walletRef, onClose, btnRef)

  const handleBack = async () => {
    history.goBack()
    if (history.location.pathname === '/') {
      dispatch({ type: NativeWalletActions.SET_INITIAL_ROUTE, payload: '/' })
    }
  }

  useEffect(() => {
    if (initialRoute) {
      history.push(initialRoute)
    }
  }, [history, initialRoute])

  return (
    <>
      <Box
        position='absolute'
        top='100%'
        right='0'
        pointerEvents={modal ? 'all' : 'none'}
        transform={modal ? 'scale(1)' : 'scale(0)'}
        ref={walletRef}
        background='keystore.white'
        borderWidth='1px'
        borderColor='keystoreNeutral.100'
        borderRadius='10px'
        boxShadow='0px 20px 50px rgba(0,0,0,0.2)'
        zIndex={5}
      >
        <Box
          height='100%'
          justifyContent='center'
          pt={3}
          pb={6}
          width={isLargerThanMd ? '370px' : '90%'}
          position='relative'
        >
          <Flex px={3} justifyContent='space-between' alignItems='center' position='absolute'>
            {!match?.isExact && showBackButton && (
              <IconButton
                icon={<ArrowBackIcon />}
                aria-label='Back'
                variant='ghost'
                fontSize='xl'
                size='sm'
                isRound
                onClick={handleBack}
              />
            )}
          </Flex>
          <AnimatePresence exitBeforeEnter initial={false}>
            <SlideTransition key={location.key}>
              <Switch key={location.pathname} location={location}>
                {type &&
                  WALLET_PAGES[type].routes.map((route, index) => {
                    const Component = route.component
                    return !Component ? null : (
                      <Route
                        exact
                        key={index}
                        path={route.path}
                        render={routeProps => <Component {...routeProps} />}
                      />
                    )
                  })}
                <Route render={routeProps => <Activity {...routeProps} />} />
              </Switch>
            </SlideTransition>
          </AnimatePresence>
        </Box>
      </Box>
    </>
  )
}
