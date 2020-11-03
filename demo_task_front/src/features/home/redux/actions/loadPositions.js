import {refreshPositions, setIsLoading} from '../actions';

export function loadPositions() {
    return dispatch => {
        dispatch(setIsLoading(true));
        fetch(`http://localhost:8000/positions/`)
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