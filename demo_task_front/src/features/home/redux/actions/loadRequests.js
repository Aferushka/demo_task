import {refreshRequests, setIsLoading} from '../actions';

export function loadRequests() {
    return dispatch => {
        fetch(`http://localhost:8000/requests/`)
            .then(result => result.json())
            .then(requests => {
                if (requests.error) {
                    throw(requests.error);
                }
                dispatch(refreshRequests(requests));
            })
            .catch(error => {
                console.log(error);
            })
    }
}