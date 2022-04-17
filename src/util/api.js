import {BASE_URL} from '../config';

export const apiCall = (path, data, method) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    })
      .then(res => {
        if (res.status === 200) return res.json().then(resolve);
        else if (res.status === 400) {
          return res.json().then(err => {
            console.log('Error fetching', err);
            reject(err);
          })
        }
      })
  })
}
