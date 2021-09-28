import { Modal } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationProcessManagementActions from "../action";

type Props = {

};

const VerifyCompleteModal = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
   showVerifyCompletetModal,  
  } = useAppSelector((state) => state.verificationProcessManagement);

  const closeModal = () => {
    dispatch(verificationProcessManagementActions.changeVerifyCompleteModalState(false));
  };
  
  return (
    <Modal
      opened={showVerifyCompletetModal}
      onClose={closeModal}
      title="Phân loại doanh nghiệp"
      size="xl"
    >
      <div>
        Thông tin...
      </div>
      
    </Modal>
  );
};

export default VerifyCompleteModal;
