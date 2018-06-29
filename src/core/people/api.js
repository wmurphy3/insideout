import { getResponseData, buildBody } from '*/core/api/helpers'
import { REACT_APP_API_URL }          from 'react-native-dotenv'

const ENDPOINT = `${REACT_APP_API_URL}/people`;
const REPORT = `${REACT_APP_API_URL}/users`;

export default {
  getPeople: (token, location, query) => {
    return fetch(`${ENDPOINT}?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&page_number=${"page_number" in query ? query["page_number"] : 1 }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`,
      }
    })
    .then(resp => getResponseData(resp))
  },
  getPerson: (token, id) => {
    return fetch(`${ENDPOINT}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`,
      }
    })
    .then(resp => getResponseData(resp))
  },
  reportUser: (token, id, reason) => {
    return fetch(`${ENDPOINT}/report?id=${id}&reason=${reason}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`,
      }
    })
    .then(resp => getResponseDelete(resp))
  }

}
