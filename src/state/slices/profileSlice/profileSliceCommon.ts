import {
  NotificationModel,
  NotificationStatus,
} from 'components/Notification/context/NotificationProvider'

export type User = {
  firstName: string
  lastName: string
  email: string
  phone: string
  level: number
  is2FAEnabled: boolean
}

export type Profile = {
  user: User
  notifications: NotificationModel[]
}

export type NotificationPayload = {
  notifications: NotificationModel[]
  shouldConcat?: boolean
}

export const initialState: Profile = {
  user: {
    firstName: 'Name',
    lastName: 'Surname',
    email: 'sarahjane@mail.com',
    phone: '+27 83 445 5423',
    level: 0,
    is2FAEnabled: false,
  },
  notifications: [
    {
      type: NotificationStatus.pending,
      date: 1654395222,
      title: 'Level 1 verification submitted',
      data: '',
      hasBeenRead: true,
    },
    {
      type: NotificationStatus.success,
      date: 1654568022,
      title: 'Level 2 verification approved',
      data: '',
      hasBeenRead: true,
    },
    {
      type: NotificationStatus.failed,
      date: 1654395222,
      title: 'Level 3 verification declined',
      data: '',
      hasBeenRead: false,
    },
    {
      type: NotificationStatus.success,
      date: 1654913622,
      title: '2FA enabled',
      data: '',
      hasBeenRead: false,
    },
    {
      type: NotificationStatus.success,
      date: 1655200000,
      title: 'Level 3 verification approved',
      data: '',
      hasBeenRead: false,
    },
  ],
}
