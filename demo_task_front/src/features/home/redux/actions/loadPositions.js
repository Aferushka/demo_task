import {refreshPositions, setIsLoading} from '../actions';

export function loadPositions() {
    return dispatch => {
        dispatch(setIsLoading(true));
        alert(`http://`+ process.env.REACT_APP_API_HOST +`:8000/positions/`)
        fetch(`http://`+ process.env.REACT_APP_API_HOST +`:8000/positions/`)
            .then(result => result.json())
            .then(positions => {
                if (positions.error) {
                    throw(positions.error);
                }
                dispatch(refreshPositions(positions));
                dispatch(setIsLoading(false));
            })
            .catch(error => {
                console.log(error);
            })
    }
}