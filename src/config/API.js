/**
 * FindMyBlood 
 * Global API URL's
 */

//Protocol and Host Links
const PROTOCOL = 'https://';
// const HOST = '10.0.2.2'; //For Android emulator we are using ip address instead of localhost name ios-> localhost
const HOST = 'findmyblood.000webhostapp.com'; 
//API LINKS
const API_REGISTER = PROTOCOL+HOST+'/findmyblood/api/register-user.php'
const API_LOGIN = PROTOCOL+HOST+'/findmyblood/api/login-user.php'
const API_ADD_DONER = PROTOCOL+HOST+'/findmyblood/api/add-doner.php'
const API_ADD_CAMP = PROTOCOL+HOST+'/findmyblood/api/add-camp.php'
const API_ADD_REQUEST = PROTOCOL+HOST+'/findmyblood/api/add-request.php'
const API_GET_COUNTS = PROTOCOL+HOST+'/findmyblood/api/get-counts.php'
const API_GET_NEWS = PROTOCOL+HOST+'/findmyblood/api/get-camps.php'
const API_GET_USERS = PROTOCOL+HOST+'/findmyblood/api/get-users.php'
const API_GET_DONERS = PROTOCOL+HOST+'/findmyblood/api/get-doners.php'
const API_GET_REQUESTS = PROTOCOL+HOST+'/findmyblood/api/get-requests.php'
const API_GET_USERPROFILE = PROTOCOL+HOST+'/findmyblood/api/user-profile.php'

//Exporting All API Links to Use
export default
{
    API_REGISTER:API_REGISTER,
    API_LOGIN:API_LOGIN,
    API_ADD_DONER:API_ADD_DONER,
    API_ADD_CAMP:API_ADD_CAMP,
    API_GET_NEWS:API_GET_NEWS,
    API_ADD_REQUEST:API_ADD_REQUEST,
    API_GET_COUNTS:API_GET_COUNTS,
    API_GET_USERS:API_GET_USERS,
    API_GET_DONERS:API_GET_DONERS,
    API_GET_REQUESTS:API_GET_REQUESTS,
    API_GET_USERPROFILE:API_GET_USERPROFILE,
    
}
    
 