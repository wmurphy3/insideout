import { getResponseData, buildBody, getResponseDelete } from '*/core/api/helpers'
import { REACT_APP_API_URL }          from 'react-native-dotenv'

const ENDPOINT = `${REACT_APP_API_URL}/people`;
const REPORT = `${REACT_APP_API_URL}/users`;

export default {
  getPeople: (token, location, query) => {
    let url = `${ENDPOINT}?page_number=${"page_number" in query ? query["page_number"] : 1 }`
    url += location ? `&latitude=${location.coords.latitude}&longitude=${location.coords.longitude}` : ``
    
    return fetch(url, {
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
    console.log(id)
    return fetch(`${REPORT}/report?id=${id}&reason=${reason}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || undefined}`,
      }
    })
    .then(resp => getResponseData(resp))
  }

}
