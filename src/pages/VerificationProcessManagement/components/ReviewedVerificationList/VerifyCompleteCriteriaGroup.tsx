import { Checkbox, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import _ from "lodash";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { VerificationCriteria } from "../../../../types/models";
import verificationProcessManagementActions from "../../action";
import VerifyCompleteCriteria from "./VerifyCompleteCriteria";

type Props = {
  verificationCriterias: VerificationCriteria[];
};

const VerifyCompleteCriteriaGroup = (props: Props) => {
  const notifications = useNotifications();
  const dispatch = useAppDispatch();
  const { criterias } = useAppSelector((state) => state.criteria);
  const { editingProcess } = useAppSelector((state) => state.verificationProcessManagement);

  const columns: IDataTableColumn<VerificationCriteria>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tên tiêu chí',
      selector: (row) => {
        const criteria = _.find(criterias, (item) => item.id === row.criteriaDetailId);
        return <div>{criteria?.criteriaName ?? ''}</div>;
      },
    },
    {
      name: 'Tuân thủ',
      selector: (row) => (
        <Checkbox
          readOnly
          checked={row.approvedStatus === 'COMPLIED'}
        />
      ),
    }
  ];

  const complied = _.filter(props.verificationCriterias, (criteria) => criteria.approvedStatus === 'COMPLIED').length;

  return (
    <div>
      <Text>
        Số lượng tiêu chí tuân thủ: {complied}/{_.size(props.verificationCriterias)}
      </Text>
      <DataTable
        columns={columns}
        data={props.verificationCriterias}
        noDataComponent={<Text>Không có dữ liệu</Text>}
        expandableRows
        expandableRowsComponent={<VerifyCompleteCriteria />}
      />
    </div>
  );
};

export default VerifyCompleteCriteriaGroup;
