import axios from 'axios';
import { BASE_URL } from '../constants/endPoints';

/**
 * Make API requests and perform actions according to parameters provided
 *
 * @param {String} item Item to fetch from API
 * @param {Function} setResponse Function to set response data on the redux store
 * @param {Function} toggleLoading Function to toggle the loading state on the Component being loaded
 * @param {String} type (Optional) Type of the item to fetch from API , 'user' or 'search'
 * @param {Function} loadFailHandler (optional) Function to reroute to page not found on bad request
 */
function getItem(item, setResponse, toggleLoading, type, loadFailHandler) {
  toggleLoading();
  axios
    .get(
      `${type === 'user' ? BASE_URL + '/users/' : ''}${item}${type === 'search' ? '&' : '?'}client_id=${
        process.env.GITHUB_CLIENT_ID
      }&client_secret=${process.env.GITHUB_CLIENT_SECRET}`
    )
    .then((res) => {
      type === 'search' ? setResponse(res.data.items) : setResponse(res.data);
      toggleLoading();
    })
    .catch((error) => {
      setResponse(null);
      loadFailHandler();
    });
}

export default getItem;
