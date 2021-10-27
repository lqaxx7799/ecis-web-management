import { AppDispatch } from '../../app/store';
import { CriteriaDetail } from '../../types/models';
import { CriteriaDetailActionTypes } from '../reducers/criteriaDetail.reducer';
import criteriaDetailServices from '../services/criteriaDetail.services';
import { AppThunk } from './type';

function getAll(): AppThunk<Promise<CriteriaDetail[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<CriteriaDetailActionTypes>({
      type: 'CRITERIA_DETAIL_LOADING',
    });
    try {
      const result = await criteriaDetailServices.getAll();
      dispatch<CriteriaDetailActionTypes>({
        type: 'CRITERIA_DETAIL_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<CriteriaDetailActionTypes>({
        type: 'CRITERIA_DETAIL_LOAD_FAILED',
      });
      return [];
    }
  }
}

const criteriaDetailActions = {
  getAll,
};

export default criteriaDetailActions;
