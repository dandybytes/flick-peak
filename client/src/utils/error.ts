export const getErrorObjectMessage = (error: any, defaultMessage = 'Unknown error'): string =>
  typeof error === 'string'
    ? error
    : typeof error?.message === 'string'
    ? error.message
    : typeof error?.message?.message === 'string'
    ? error.message.message
    : typeof error?.response?.data?.message === 'string'
    ? error.response.data.message
    : defaultMessage
