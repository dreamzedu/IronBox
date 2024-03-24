import { Platform } from 'react-native'


let baseURL = '';
const apiPrefix = 'api/v1/';

{Platform.OS == 'android'
? baseURL = 'http://10.0.2.2:3001/'
: baseURL = 'http://localhost:3001/'
}

export { baseURL, apiPrefix };
