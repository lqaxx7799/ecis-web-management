import { Button, LoadingOverlay, Title } from "@mantine/core";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import verificationProcessManagementActions from "../../action";
import CompanyEditVerificationCriteria from "./CompanyEditVerificationCriteria";
import EditDocumentModal from "./EditDocumentModal";

type Props = {

};

type RouteParams = {
  id: string;
};

const CompanyEditVerification = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, verificationCriterias } = useAppSelector((state) => state.verificationProcessManagement);
  const { criterias } = useAppSelector((state) => state.criteria);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);

  let { id } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(verificationProcessManagementActions.loadSelfVerification(parseInt(id)));
  }, []);

  const groupedCriteria = _.groupBy(verificationCriterias, editingCriteria => {
    const found = _.find(criterias, criteria => criteria.id === editingCriteria.criteriaDetailId);
    return found?.criteriaTypeId;
  });

  return (
    <div className="company-verification-form">
      <LoadingOverlay visible={loading} />
      <Title order={1}>Cập nhật tự đánh giá</Title>
      <Button
        style={{ marginTop: '12px' }}
        component={Link}
        leftIcon={<ChevronLeftIcon />}
        to="/qua-trinh-danh-gia/ho-tro"
      >
        Quay lại
      </Button>
      
      <div style={{ marginTop: '24px' }}>
        {
          Object.keys(groupedCriteria).map((criteriaTypeId) => {
            const criteriaType = _.find(criteriaTypes, type => type.id === parseInt(criteriaTypeId));

            const criteriaList = groupedCriteria[criteriaTypeId];
            return (
              <div key={criteriaTypeId}>
                <Title order={3}>{criteriaType?.criteriaTypeName ?? ''}</Title>
                <CompanyEditVerificationCriteria
                  verificationCriterias={criteriaList}
                />
              </div>
            );
          })
        }

      </div>
      <EditDocumentModal />
    </div>
  );
}

export default CompanyEditVerification;
