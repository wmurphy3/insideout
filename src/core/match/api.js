import { getResponseData, getResponseDelete, buildBody} from '*/core/api/helpers'
import { REACT_APP_API_URL }                            from 'react-native-dotenv'

const ENDPOINT = `${REACT_APP_API_URL}/matches`;

export default {

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
  declineMatch: (token, user_id) => {
    return fetch(`${ENDPOINT}/create_decline`, {
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
  }
}
