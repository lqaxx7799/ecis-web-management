import { AppDispatch } from '../../app/store';
import { Province } from '../../types/models';
import { ProvinceActionTypes } from '../reducers/province.reducer';
import provinceServices from '../services/province.services';
import { AppThunk } from './type';

function getAll(): AppThunk<Promise<Province[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<ProvinceActionTypes>({
      type: 'PROVINCE_LOADING',
    });
    try {
      const result = await provinceServices.getAll();
      dispatch<ProvinceActionTypes>({
        type: 'PROVINCE_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<ProvinceActionTypes>({
        type: 'PROVINCE_LOAD_FAILED',
      });
      return [];
    }
  }
}

const provinceActions = {
  getAll,
};

export default provinceActions;
