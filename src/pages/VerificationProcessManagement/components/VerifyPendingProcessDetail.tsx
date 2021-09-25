import { Button, LoadingOverlay, Tab, Tabs, Text, Title } from "@mantine/core";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationProcessManagementActions from "../action";
import VerifyPendingProcessCriteriaGroup from "./VerifyPendingProcessCriteriaGroup";

type Props = {

};

type RouteParams = {
  id: string;
};

const VerifyPendingProcessDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, verificationCriterias } = useAppSelector((state) => state.verificationProcessManagement);
  const { criterias } = useAppSelector((state) => state.criteria);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);

  let { id } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(verificationProcessManagementActions.loadSelfVerification(parseInt(id)));
  }, []);

  const groupedCriteria = _.groupBy(verificationCriterias, (editingCriteria) => {
    const found = _.find(criterias, criteria => criteria.id === editingCriteria.criteriaId);
    return found?.criteriaTypeId;
  });

  return (
    <div className="verify-pending-process-detail">
      <Helmet>
        <title>Phân loại doanh nghiệp</title>
      </Helmet>
      <LoadingOverlay visible={loading} />
      <Title order={1}>Phân loại doanh nghiệp</Title>
      <Button
        style={{ marginTop: '12px' }}
        component={Link}
        leftIcon={<ChevronLeftIcon />}
        to="/qua-trinh-danh-gia/phan-loai"
      >
        Quay lại
      </Button>

      <div style={{ marginTop: '24px' }}>
      {
        !_.isEmpty(Object.keys(groupedCriteria)) && (
          <Tabs>
            {
              Object.keys(groupedCriteria).map((criteriaTypeId) => {
                const criteriaType = _.find(criteriaTypes, type => type.id === parseInt(criteriaTypeId));
    
                const criteriaList = groupedCriteria[criteriaTypeId];
                return (
                  <Tab
                    label={criteriaType?.criteriaTypeName ?? ''}
                    key={criteriaTypeId}
                  >
                    <VerifyPendingProcessCriteriaGroup
                      verificationCriterias={criteriaList}
                    />
                  </Tab>
                );
              })
            }
          </Tabs>
        )
      }
      </div>
    </div>
  );
};

export default VerifyPendingProcessDetail;
