import { AppDispatch } from '../../app/store';
import { CriteriaType } from '../../types/models';
import { CriteriaTypeActionTypes } from '../reducers/criteriaType.reducer';
import criteriaTypeServices from '../services/criteriaType.services';
import { AppThunk } from './type';

function getAll(): AppThunk<Promise<CriteriaType[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<CriteriaTypeActionTypes>({
      type: 'CRITERIA_TYPE_LOADING',
    });
    try {
      const result = await criteriaTypeServices.getAll();
      dispatch<CriteriaTypeActionTypes>({
        type: 'CRITERIA_TYPE_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<CriteriaTypeActionTypes>({
        type: 'CRITERIA_TYPE_LOAD_FAILED',
      });
      return [];
    }
  }
}

const criteriaTypeActions = {
  getAll,
};

export default criteriaTypeActions;
