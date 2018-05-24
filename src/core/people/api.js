import { getResponseData, buildBody } from '*/core/api/helpers'
import { REACT_APP_API_URL }          from 'react-native-dotenv'

const ENDPOINT = `${REACT_APP_API_URL}/people`;

export default {
  getPeople: (token, location) => {
    return fetch(`${ENDPOINT}?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`,
      }
    })
    .then(resp => getResponseData(resp))
  },

}
