import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Flex,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { SlideTransition } from 'components/SlideTransition'
import { useAuthorization } from 'hooks/useAuthorization/useAuthorization'

import { AuthorizationActions } from './AuthorizationActionTypes'
import { SignIn } from './components/SignIn'
import { AUTHORIZATION_STEPS } from './config'

export const AuthorizationViewsSwitch = () => {
  const history = useHistory()
  const location = useLocation()
  const match = useRouteMatch('/')

  const {
    state: { initialRoute, modal, showBackButton, type },
    dispatch,
  } = useAuthorization()

  const onClose = async () => {
    history.replace('/')
    dispatch({
      type: AuthorizationActions.SET_AUTHORIZATION_MODAL,
      payload: false,
    })
  }

  const handleBack = async () => {
    history.goBack()
    if (history.location.pathname === '/') {
      dispatch({ type: AuthorizationActions.SET_INITIAL_ROUTE, payload: '/' })
    }
  }

  useEffect(() => {
    if (initialRoute) {
      history.push(initialRoute)
    }
  }, [history, initialRoute])

  // eslint-disable-next-line no-console
  console.log(history)

  return (
    <>
      <Modal
        isOpen={modal}
        onClose={onClose}
        isCentered
        trapFocus={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent justifyContent='center' px={3} pt={3} pb={6}>
          <Flex justifyContent='space-between' alignItems='center' position='relative'>
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
            <ModalCloseButton ml='auto' borderRadius='full' position='static' />
          </Flex>
          <AnimatePresence exitBeforeEnter initial={false}>
            <SlideTransition key={location.key}>
              <Switch key={location.pathname} location={location}>
                {type &&
                  AUTHORIZATION_STEPS[type].routes.map((route, index) => {
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
                <Route render={routeProps => <SignIn {...routeProps} />} />
              </Switch>
            </SlideTransition>
          </AnimatePresence>
        </ModalContent>
      </Modal>
    </>
  )
}
