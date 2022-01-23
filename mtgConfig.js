let mtgUrl
const mtgUrls = {
  production: 'https://api.magicthegathering.io/v1/',
  development: 'https://api.magicthegathering.io/v1/'
}

if (window.location.hostname === 'localhost') {
  mtgUrl = mtgUrls.development
} else {
  mtgUrl = mtgUrls.production
}

export default mtgUrl
