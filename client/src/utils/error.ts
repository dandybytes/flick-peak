export const getErrorObjectMessage = (error: any, defaultMessage: string): string =>
  typeof error?.response?.data?.message === 'string'
    ? error.response.data.message
    : typeof error?.message === 'string'
    ? error.message
    : typeof error === 'string'
    ? error
    : defaultMessage
