import { AppDispatch } from "../../app/store";
import { VerificationDocument } from "../../types/models";
import verificationDocumentServices from "../services/verificationDocument.services";
import { AppThunk } from "./type";

function createDocument(document: Partial<VerificationDocument>): AppThunk<Promise<VerificationDocument>> {
  return (dispatch: AppDispatch) => {
    return verificationDocumentServices.create(document);
  };
}

const verificationDocumentActions = {
  createDocument,
};

export default verificationDocumentActions;
