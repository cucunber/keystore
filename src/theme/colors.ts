const commonColors = {
  lime: {
    50: '#EBEFFE',
    100: '#B5C4FC',
    200: '#79C62B',
    300: '#5F80FA',
    400: '#486FF9',
    500: '#79C62B',
    600: '#2D4EC9',
    700: '#243EA1',
    800: '#1C317E',
    900: '#15255F',
    bg: 'rgba(121, 198, 43, 0.2)',
  },
  gray: {
    900: '#171923',
    850: '#191d28',
    825: '#191e2a',
    815: '#1a1f2b',
    800: '#181c27',
    785: '#1A202C',
    750: '#212631',
    700: '#2D3748',
    600: '#4A5568',
    500: '#718096',
    400: '#A0AEC0',
    300: '#CBD5E0',
    200: '#E2E8F0',
    100: '#EDF2F7',
    50: '#F7FAFC',
    dark: '#858689',
  },
  orange: '#FFAC30',
  keystore: {
    50: '#F8FAFC',
    150: '#CDD5DF',
    200: '#748094',
    white: '#FFFFFF',
  },
  keystoreNeutral: {
    100: '#E3E8EF',
    200: '#012A36',
  },
  keystorePrimarySlate: {
    200: '#012A36',
  },
  green: {
    900: '#004F3A',
    800: '#00684D',
    700: '#008562',
    600: '#00A67B',
    500: '#79C62B',
    400: '#79C62B',
    300: '#33D7AD',
    200: '#5CDFBD',
    100: '#A1ECD9',
    50: '#E6FAF5',
  },
  red: {
    50: '#FFF5F5',
    100: '#FFF8F8',
    200: '#FDE3E3',
    300: '#FAC1C0',
    400: '#F5918F',
    500: '#EF5350',
    600: '#DD4D4A',
    700: '#C74543',
    800: '#AE3C3B',
    900: '#923231',
  },
  slate: {
    25: '#F2F4F5',
    200: '#012A36',
  },
  tag: {
    100: 'rgba(121, 198, 43, 0.2)',
    800: '#012A36',
  },
  darkTeal: {
    500: '#144241',
    300: '#3F6D6C',
  },
  statuses: {
    failed: '#FF495C',
    success: '#79C62B',
    pending: '#FFAC30',
    queued: '#748094',
  },
}

export const brand = {
  primary: commonColors.lime[200],
  altBg: `radial-gradient(94.32% 94.6% at 4.04% -44.6%,
    ${commonColors.lime[200]}66 0%,${commonColors.keystorePrimarySlate[200]}00 100%),
    linear-gradient(0deg,${commonColors.keystorePrimarySlate[200]},${commonColors.keystorePrimarySlate[200]})`,
}

export const notifications = {
  notificationsShadow: '0px 5px 10px rgba(0, 0, 0, 0.15)',
}

export const colors = {
  ...commonColors,
  ...brand,
  ...notifications,
}
