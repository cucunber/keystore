import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Flex,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useMediaQuery,
} from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { SlideTransition } from 'components/SlideTransition'
import { useProfile } from 'hooks/useProfile/useProfile'
import { breakpoints } from 'theme/theme'

import { EditDetails } from './components/EditDetails'
import { PROFILE_STEPS } from './config'
import { ProfileActions } from './ProfileActionTypes'

export const ProfileViewsSwitch = () => {
  const history = useHistory()
  const location = useLocation()
  const match = useRouteMatch('/')

  const [isLargerThanMd] = useMediaQuery(`(min-width: ${breakpoints['md']})`)

  const {
    state: { initialRoute, modal, showBackButton, type, route },
    dispatch,
  } = useProfile()

  const onClose = async () => {
    history.replace('/')
    dispatch({
      type: ProfileActions.SET_PROFILE_MODAL,
      payload: { modal: false, route: '' },
    })
  }

  const handleBack = async () => {
    history.goBack()
    if (history.location.pathname === '/') {
      dispatch({ type: ProfileActions.SET_INITIAL_ROUTE, payload: '/' })
    }
  }

  useEffect(() => {
    if (initialRoute) {
      history.push(initialRoute)
    }
  }, [history, initialRoute])

  useEffect(() => {
    if (route) {
      history.push(route)
    }
  }, [history, route])

  return (
    <>
      <Modal
        isOpen={modal}
        onClose={onClose}
        scrollBehavior='outside'
        trapFocus={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent
          justifyContent='center'
          px={3}
          pt={3}
          pb={6}
          minWidth={isLargerThanMd ? '700px' : '90%'}
        >
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
                  PROFILE_STEPS[type].routes.map((route, index) => {
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
                <Route render={routeProps => <EditDetails {...routeProps} />} />
              </Switch>
            </SlideTransition>
          </AnimatePresence>
        </ModalContent>
      </Modal>
    </>
  )
}
