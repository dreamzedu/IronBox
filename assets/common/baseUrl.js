import { Platform } from 'react-native'


let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://10.0.2.2:3001/api/v1/'
: baseURL = 'http://localhost:3001/api/v1/'
}

export default baseURL;
