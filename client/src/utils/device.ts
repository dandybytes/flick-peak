export const isMobileDevice = () =>
  window.navigator.userAgent.match(/Mobile|Phone|Android|webOS|iPad|iPod|BlackBerry/i)

export const isSmallScreen = () => window.innerWidth < 500 || window.innerHeight < 750
