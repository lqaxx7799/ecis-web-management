import { Checkbox, Text } from "@mantine/core";
import _ from "lodash";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { useAppSelector } from "../../../app/store";
import { VerificationCriteria } from "../../../types/models";
import VerifyPendingProcessCriteria from "./VerifyPendingProcessCriteria";

type Props = {
  verificationCriterias: VerificationCriteria[];
};

const VerifyPendingProcessCriteriaGroup = (props: Props) => {
  const { criterias } = useAppSelector((state) => state.criteria);

  const markAsFinished = (verificationCriteriaId: number) => {

  };

  const columns: IDataTableColumn<VerificationCriteria>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tên tiêu chí',
      selector: (row) => {
        const criteria = _.find(criterias, (item) => item.id === row.criteriaId);
        return criteria?.criteriaName ?? '';
      },
    },
    {
      name: 'Hoàn thành',
      selector: (row) => (
        <Checkbox
          checked={row.approvedStatus === 'FINISHED'}
          onClick={() => markAsFinished(row.id)}
        />
      ),
    }
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={props.verificationCriterias}
        noDataComponent={<Text>Không có dữ liệu</Text>}
        expandableRows
        expandableRowsComponent={<VerifyPendingProcessCriteria />}
      />
    </div>
  );
};

export default VerifyPendingProcessCriteriaGroup;
