import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

export default function VerifyAdmin() {
    const history = useNavigate();
    const token = Cookie.get('adEmail');

    axios.post('http://localhost:3002/admin/verifyAdmin', { token: token }).then((response) => {
        if (response.status === 201) {
            console.log('login complete.........');
            history("/adminDashboard");
        } else if (response.status === 202) {
            console.log('Something went wrong 202......');

            history("/adminLogin");
        }
    }).catch((error) => {
        console.log('catch :', error);
    })
}
