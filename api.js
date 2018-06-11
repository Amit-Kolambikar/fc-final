import axios from 'axios';
const BaseURL = "http://bs.baltcoda.com/api";
const client = ( lang = "en") => {
    const defaultOptions = {
        headers: {
            'Accept-Language' : lang,
            'Accept':'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
    };

    return {
        get: (url, options = {}) => axios.get(BaseURL+url, { ...defaultOptions, ...options }),
        getImage: (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
        post: (url, data, options = {}) => axios.post(BaseURL+url, data, { ...defaultOptions, ...options }),
        put: (url, data, options = {}) => axios.put(BaseURL+url, data, { ...defaultOptions, ...options }),
        delete: (url, options = {}) => axios.delete(BaseURL+url, { ...defaultOptions, ...options }),
    };
};

export const request = client();

export const setAuthToken =(token)=> {
    axios.defaults.headers.common['Authorization'] = '';

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};
export const deleteToken =()=> {
    delete axios.defaults.headers.common['Authorization'];
};
axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
})

axios.interceptors.response.use(response => {
    console.log('Response:', response)
    return response
})

