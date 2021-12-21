import { ThirdParty } from "../../types/models";

export const THIRD_PARTY_LOADING = 'THIRD_PARTY_LOADING';
export const THIRD_PARTY_LOADED = 'THIRD_PARTY_LOADED';
export const THIRD_PARTY_LOAD_FAILED = 'THIRD_PARTY_LOAD_FAILED';
export const THIRD_PARTY_DETAIL_LOADED = 'THIRD_PARTY_DETAIL_LOADED';

interface ThirdPartyLoading {
  type: typeof THIRD_PARTY_LOADING;
};

interface ThirdPartyLoaded {
  type: typeof THIRD_PARTY_LOADED;
  payload: ThirdParty[];
};

interface ThirdPartyLoadFailed {
  type: typeof THIRD_PARTY_LOAD_FAILED;
};

interface ThirdPartyDetailLoaded {
  type: typeof THIRD_PARTY_DETAIL_LOADED;
  payload: ThirdParty;
};

export type ThirdPartyActionTypes = 
  | ThirdPartyLoading
  | ThirdPartyLoaded
  | ThirdPartyLoadFailed
  | ThirdPartyDetailLoaded;

export type ThirdPartyState = {
  loading: boolean;
  thirdParties: ThirdParty[];
  editingThirdParty?: ThirdParty;
};

const initialState: ThirdPartyState =  {
  loading: false,
  thirdParties: [],
  editingThirdParty: undefined,
};

const thirdPartyReducer = (state = initialState, action: ThirdPartyActionTypes): ThirdPartyState => {
  switch (action.type) {
    case THIRD_PARTY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case THIRD_PARTY_LOADED:
      return {
        ...state,
        loading: false,
        thirdParties: action.payload,
      };
    case THIRD_PARTY_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    case THIRD_PARTY_DETAIL_LOADED:
      return {
        ...state,
        editingThirdParty: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default thirdPartyReducer;
