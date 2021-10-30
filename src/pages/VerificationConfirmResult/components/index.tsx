import dayjs from "dayjs";
import _ from "lodash";
import { useEffect } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationConfirmRequirementActions from "../../../common/actions/verificationConfirmRequirement.action";
import { VerificationConfirmRequirement } from "../../../types/models";

type Props = {

};

const VerificationConfirmResult = (props: Props) => {
  const dispatch = useAppDispatch();
  const { agent } = useAppSelector((state) => state.authentication);
  const { verificationConfirmRequirements, loading } = useAppSelector((state) => state.verificationConfirmRequirement);

  useEffect(() => {
    dispatch(verificationConfirmRequirementActions.getAssignedFinished(agent?.id ?? 0));
  }, []);

  const columns: IDataTableColumn<VerificationConfirmRequirement>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Công ty cần xác minh',
      selector: (row) => `${_.get(row, 'verificationProcess.company.companyNameVI')} (${_.get(row, 'verificationProcess.company.companyCode')})`,
      wrap: true,
    },
    {
      name: 'Nội dung cần xác minh',
      selector: (row) => _.get(row, 'verificationCriteria.criteriaDetail.criteriaDetailName'),
      wrap: true,
    },
    {
      name: 'Mô tả',
      selector: (row) => _.get(row, 'announceAgentDocumentContent'),
      wrap: true,
    },
    {
      name: 'Người giải quyết',
      selector: (row) => `${_.get(row, 'assignedAgent.lastName')} ${_.get(row, 'assignedAgent.firstName')}`,
      wrap: true,
    },
    {
      name: 'Kết quả',
      selector: 'confirmDocumentContent',
      wrap: true,
    },
    {
      name: 'Thời gian tạo',
      selector: 'createdAt',
      format: (row) => dayjs(row.createdAt).format('DD/MM/YYYY'),
    },
  ];

  return (
    <div className="x_panel">
      <div className="x_title">
        <h2>Duyệt yêu cầu xác minh</h2>
        <div className="clearfix"></div>
      </div>
      <div className="x_content">
        <div className="clearfix"></div>
        <div className="col-xs-12 table">
          <DataTable
            noHeader
            striped
            highlightOnHover
            columns={columns}
            data={verificationConfirmRequirements}
            noDataComponent="Không có yêu cầu"
          />
        </div>
      </div>
    </div>
  );
};

export default VerificationConfirmResult;
