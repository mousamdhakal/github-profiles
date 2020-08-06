import axios from 'axios';
import { BASE_URL } from '../constants/endPoints';

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
