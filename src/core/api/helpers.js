const logout_sync = () => {
  return {
    type: 'user/LOGOUT'
  }
}

function validateUser(response) {
  return ((response.status !== 401 && response.status !== 422) ? true : false)
}

export const logout_user = () => {
  return (dispatch, getstore) => {
    dispatch(logout_sync())
  }
}

export const refreshTokenFormData = (token) => {
  let formdata = new FormData();
  formdata.append('grant_type','refresh_token');
  formdata.append('refresh_token',token);

  return formdata;
}

export const getRegisterFormData = () => {
  let formdata = new FormData();
  formdata.append('grant_type','client_credentials');

  return formdata;
}

export const getPasswordFormData = (user) => {
  let formdata = new FormData();
  formdata.append('email',user.email);

  return formdata;
}

// Handle response
export const getResponseData = (response)  => {
  var json = response.json();

  if(validateUser(response)) {
    return json;
  } else {
    return json.then(Promise.reject.bind(Promise));
  }
}

// Handle delete response
export const getResponseDelete = (response)  => {
  if (response.status === 200 || response.ok) {
    return 'Deleted';
  } else {
    let json = response.json();
    return json.then(Promise.reject.bind(Promise));
  }
}

export const buildBody = (type, data) => {
  return JSON.stringify({
    "data": {
      "type": type,
      "attributes": data
    }
  })
}

export const imageData = (image) => {
  let formData = new FormData();
  let filename = image.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  formData.append('image', { uri: image, name: filename, type: 'image/jpg' });

  return formData;
}
