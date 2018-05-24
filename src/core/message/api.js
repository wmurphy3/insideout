import { getResponseData, buildBody } from '*/core/api/helpers'
import { REACT_APP_API_URL }          from 'react-native-dotenv'

const ENDPOINT = `${REACT_APP_API_URL}/messages`;

export default {
  getMessages: (token, id) => {

    return fetch(`${ENDPOINT}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`,
      }
    })
    .then(resp => getResponseData(resp))
  },
  setMessage: (token, message, id) => {
    return fetch(ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        "data": {
          "type": 'message',
          "attributes": {
            "message": message.text,
            "match_id": id
          }
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`
      }
    })
    .then(resp => getResponseData(resp))
  }

}
