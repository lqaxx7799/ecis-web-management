import { Checkbox, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import _ from "lodash";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { VerificationCriteria } from "../../../../types/models";
import verificationProcessManagementActions from "../../action";
import VerifyPendingProcessCriteria from "./VerifyPendingProcessCriteria";

type Props = {
  verificationCriterias: VerificationCriteria[];
};

const VerifyPendingProcessCriteriaGroup = (props: Props) => {
  const notifications = useNotifications();
  const dispatch = useAppDispatch();
  const { criterias } = useAppSelector((state) => state.criteria);
  const { editingProcess } = useAppSelector((state) => state.verificationProcessManagement);

  const markAsComplied = (value: boolean, verificationCriteriaId: number) => {
    dispatch(verificationProcessManagementActions.updateCriteriaCompliance(value, verificationCriteriaId))
      .then(() => {
        notifications.showNotification({
          color: 'green',
          title: 'Cập nhật thành công',
          message: 'Cập nhật trạng thái tuân thủ thành công',
        });
      })
      .catch(() => {
        notifications.showNotification({
          color: 'red',
          title: 'Lỗi hệ thống',
          message: 'Đã có lỗi xảy ra trong quá trình cập nhật trạng thái tuân thủ',
        });
      });
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
        const criteria = _.find(criterias, (item) => item.id === row.criteriaDetailId);
        return criteria?.criteriaName ?? '';
      },
    },
    {
      name: 'Tuân thủ',
      selector: (row) => (
        <Checkbox
          disabled={editingProcess?.isReviewed}
          checked={row.approvedStatus === 'COMPLIED'}
          onChange={(e) => markAsComplied(e.target.checked, row.id)}
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
