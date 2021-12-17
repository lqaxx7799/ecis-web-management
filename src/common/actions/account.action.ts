import { AppDispatch } from "../../app/store";
import { ChangePasswordDTO } from "../../types/dto";
import accountServices from "../services/account.services";
import { AppThunk } from "./type";

function changePassword(payload: ChangePasswordDTO): AppThunk<Promise<boolean>> {
  return (dispatch: AppDispatch) => {
    return accountServices.changePassword(payload);
  }
}

const accountActions = {
  changePassword,
};

export default accountActions;
