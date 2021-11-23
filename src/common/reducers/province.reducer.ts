import { Province } from "../../types/models";

export const PROVINCE_LOADING = 'PROVINCE_LOADING';
export const PROVINCE_LOADED = 'PROVINCE_LOADED';
export const PROVINCE_LOAD_FAILED = 'PROVINCE_LOAD_FAILED';

interface ProvinceLoading {
  type: typeof PROVINCE_LOADING;
};

interface ProvinceLoaded {
  type: typeof PROVINCE_LOADED;
  payload: Province[];
};

interface ProvinceLoadFailed {
  type: typeof PROVINCE_LOAD_FAILED;
};

export type ProvinceActionTypes = 
  | ProvinceLoading
  | ProvinceLoaded
  | ProvinceLoadFailed;

export type ProvinceState = {
  loading: boolean;
  provinces: Province[];
};

const initialState: ProvinceState =  {
  loading: false,
  provinces: []
};

const provinceReducer = (state = initialState, action: ProvinceActionTypes): ProvinceState => {
  switch (action.type) {
    case PROVINCE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PROVINCE_LOADED:
      return {
        ...state,
        loading: false,
        provinces: action.payload,
      };
    case PROVINCE_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default provinceReducer;
