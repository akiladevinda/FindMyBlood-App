/**
 * FindMyBlood 
 * Global API URL's
 */

//Protocol and Host Links
const PROTOCOL = 'http://';
const HOST = '10.0.2.2'; //For Android emulator we are using ip address instead of localhost name ios-> localhost
//API LINKS
const API_REGISTER = PROTOCOL+HOST+'/findmyblood/api/register-user.php'
const API_LOGIN = PROTOCOL+HOST+'/findmyblood/api/login-user.php'
const API_ADD_DONER = PROTOCOL+HOST+'/findmyblood/api/add-doner.php'
const API_ADD_CAMP = PROTOCOL+HOST+'/findmyblood/api/add-camp.php'
const API_GET_NEWS = PROTOCOL+HOST+'/findmyblood/api/get-camps.php'

//Exporting All API Links to Use
export default
{
    API_REGISTER:API_REGISTER,
    API_LOGIN:API_LOGIN,
    API_ADD_DONER:API_ADD_DONER,
    API_ADD_CAMP:API_ADD_CAMP,
    API_GET_NEWS:API_GET_NEWS
}
    
 