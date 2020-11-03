export const REFRESH_REQUESTS = 'REFRESH_REQUESTS';
export const REFRESH_POSITIONS = 'REFRESH_POSITIONS';
export const REFRESH_PAYMENTS = 'REFRESH_PAYMENTS';
export const SET_IS_LOADING = 'SET_IS_LOADING';

export function refreshRequests(requests) {
    return {
        type: REFRESH_REQUESTS,
        requests: requests
    }
}

export function refreshPositions(positions) {
    return {
        type: REFRESH_POSITIONS,
        positions: positions
    }
}

export function refreshPayments(payments) {
    return {
        type: REFRESH_PAYMENTS,
        payments: payments
    }
}

export function setIsLoading(isLoading) {
    return {
        type: SET_IS_LOADING,
        isLoading: isLoading
    }
}