import { AppDispatch } from '../../app/store';
import { Criteria } from '../../types/models';
import { CriteriaActionTypes } from '../reducers/criteria.reducer';
import criteriaServices from '../services/criteria.services';
import { AppThunk } from './type';

function getAll(): AppThunk<Promise<Criteria[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<CriteriaActionTypes>({
      type: 'CRITERIA_LOADING',
    });
    try {
      const result = await criteriaServices.getAll();
      dispatch<CriteriaActionTypes>({
        type: 'CRITERIA_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<CriteriaActionTypes>({
        type: 'CRITERIA_LOAD_FAILED',
      });
      return [];
    }
  }
}

const criteriaActions = {
  getAll,
};

export default criteriaActions;
