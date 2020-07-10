import axios from 'axios';

export default axios.create({
  baseURL: 'https://quiz-react-app-fb365.firebaseio.com/',
});
