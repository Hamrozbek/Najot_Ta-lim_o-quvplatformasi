import Cookies from "universal-cookie";
import { API} from ".";
import axios from "axios";


const cookies = new Cookies();

const instance = () => axios.create({baseURL:API, headers:{'Authorization': `Bearer ${cookies.get("accessToken")}`}});

export default instance