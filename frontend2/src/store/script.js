export const RECEIVE_POSTER = "poster/RECEIVE_POSTER";

const receivePoster = (poster) => ({
    type: RECEIVE_POSTER,
    poster
})


export const createPoster = (poster) => async dispatch => {
    try {
        const res = await fetch('/api/poster', {
            method: 'POST',
            body: JSON.stringify(poster)
        });
        if (res.ok) {
            const movieData = await res.json();
            dispatch(receivePoster(movieData));
            return movieData;
        }
    } catch(err) {
        const resBody = await err.json();
        console.log(resBody)
    }
};

function posterReducer(state = {}, action) {
    switch(action.type) {
        case RECEIVE_POSTER:
            return { ...state, [action.poster._id]: action.poster};
        default: 
            return state;
    }
}

export default posterReducer;