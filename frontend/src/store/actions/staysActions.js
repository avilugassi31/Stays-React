import { stayService } from '../../services/stays.service';
import { utilService } from '../../services/util.service';

  export function loadStays(filterBy) {
    return async (dispatch) => {
        const stays = await stayService.getStays(filterBy);
        console.log('stays in actions:', stays)
        const action = {
            type: 'SET_STAYS',
            stays,
        };
        dispatch(action);
    };
}
export function getStayById(stayId) {
    return async (dispatch) => {
        const stay = await stayService.getById(stayId);
        dispatch({ type: 'SET_STAY', stay });
    };
}
export function saveStay(stay) {
    return async (dispatch) => {
        const isAdd = !stay._id;
        const updatedStay = await stayService.saveStay(stay);

        if (isAdd) dispatch({ type: 'ADD_STAY', stay: updatedStay });
        else dispatch({ type: 'UPDATE_STAY', updatedStay });
    };
}
export function removeStay(stayId) {
    return async (dispatch) => {
        await stayService.deleteStay(stayId);
        dispatch({ type: 'REMOVE_STAY', stayId });
    };
}
export function addReview(review, stayId) {
    return async (dispatch) => {
        review.id = utilService.makeId();
        const stayById = await stayService.getById(stayId);
        stayById.reviews.push(review);
        const stay = await stayService.saveStay(stayId);
        dispatch({ type: 'SET_STAY', stay });
    };
}
export function getStaysByHost(hostId){
    const stays =  stayService.getStaysByHost(hostId);
    return stays
}
