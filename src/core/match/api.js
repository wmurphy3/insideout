import { getResponseData, getResponseDelete, buildBody} from '*/core/api/helpers'
import { REACT_APP_API_URL }                            from 'react-native-dotenv'

const ENDPOINT = `${REACT_APP_API_URL}/matches`;

export default {
  getMatches: (token) => {
    return fetch(ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`,
      }
    })
    .then(resp => getResponseData(resp))
  },
  createMatch: (token, user_id) => {
    return fetch(ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        "data": {
          "type": 'match',
          "attributes": {
            "accepter_id": user_id
          }
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseDelete(resp))
  },
  setNextStep: (token, id) => {
    return fetch(`${ENDPOINT}/next_step?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseDelete(resp))
  },
  blockMatch: (token, id) => {
    return fetch(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseDelete(resp))
  },
}
