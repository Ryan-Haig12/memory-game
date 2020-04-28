const axios = require('axios');

const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const baseurl = 'http://api.giphy.com/v1/gifs/search'
const apiKey = 'hrKX42fSAxMuJX9MIXHmaPzwLHuwj3aN'

const axiosCreate = term => {
    return axios({
        'method': 'GET',
        'url': `${ proxyurl }${ baseurl }?q=${ term }&api_key=${ apiKey }`,
        'headers': {
            'Access-Control-Allow-Credentials' : true,
            'access-control-allow-origin':'*',
            'Access-Control-Allow-Methods':'GET',
            'Access-Control-Allow-Headers':'application/json',
        }
    })
}

export default axiosCreate