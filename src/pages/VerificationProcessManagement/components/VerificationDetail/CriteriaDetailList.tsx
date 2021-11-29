import _ from "lodash";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { Criteria, CriteriaDetail } from "../../../../types/models";
import verificationProcessManagementActions from "../../action";
import CellEditing from "./CellEditing";
import CriteriaForm from "./CriteriaForm";

type Props = {
  data?: Criteria;
};

const CriteriaDetailList = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    verificationCriterias,
  } = useAppSelector((state) => state.verificationProcessManagement);
  const { criteriaDetails } = useAppSelector((state) => state.criteriaDetail);

  if (!props.data) {
    return null;
  }

  const markCompliance = (verificationCriteriaId: number, value: boolean) => {
    dispatch(verificationProcessManagementActions.updateCriteriaCompliance(value, verificationCriteriaId))
      .then(() => {
        toast.success('Lưu đánh giá thành công.');
      })
      .catch(() => {
        toast.error('Đã xảy ra lỗi trong quá trình lưu đánh giá. Vui lòng thử lại sau.');
      });
  };

  const editCriteriaField = (fieldName: string, verificationCriteriaId: number, value: string) => {
    return dispatch(verificationProcessManagementActions.updateCriteriaField(fieldName, verificationCriteriaId, value))
      .then(() => {
        toast.success('Lưu thành công.');
      })
      .catch(() => {
        toast.error('Đã xảy ra lỗi trong quá trình cập nhật. Vui lòng thử lại sau.');
      });
  };
  
  const filteredCriteriaDetails = _.filter(criteriaDetails, (item) => item.criteriaId === props.data?.id);

  const columns: IDataTableColumn<CriteriaDetail>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tiêu chí đánh giá',
      selector: 'criteriaDetailName',
      width: '200px',
      wrap: true,
      style: { paddingTop: '12px', paddingBottom: '12px' },
    },
    {
      name: 'Tự đánh giá',
      selector: (row) => (
        <CriteriaForm data={row} />
      ),
      style: { paddingTop: '12px', paddingBottom: '12px' },
    },
    {
      name: 'Kết quả',
      selector: (row) => {
        const currentCriteria = _.find(verificationCriterias, (item) => item.criteriaDetailId === row.id);
        if (!currentCriteria) {
          return null;
        }
        return (
          <CellEditing
            onOk={(value) => editCriteriaField('reviewResult', currentCriteria.id, value)}
            value={currentCriteria.reviewResult}
          />
        );
      },
      wrap: true,
      style: { paddingTop: '8px', paddingRight: '8px' },
      width: '150px',
    },
    {
      name: 'Góp ý',
      selector: (row) => {
        const currentCriteria = _.find(verificationCriterias, (item) => item.criteriaDetailId === row.id);
        if (!currentCriteria) {
          return null;
        }
        return (
          <CellEditing
            onOk={(value) => editCriteriaField('reviewComment', currentCriteria.id, value)}
            value={currentCriteria.reviewComment}
          />
        );
      },
      wrap: true,
      style: { paddingTop: '8px', paddingRight: '8px' },
      width: '150px',
    },
    {
      name: 'Đánh giá',
      selector: (row) => {
        const currentCriteria = _.find(verificationCriterias, (item) => item.criteriaDetailId === row.id);
        if (!currentCriteria) {
          return null;
        }
        return currentCriteria.approvedStatus === 'VERIFIED' ? (
          <>
            <i className="fa fa-thumbs-up" aria-hidden="true" /> Đạt
          </>
        ) : currentCriteria.approvedStatus === 'REJECTED' ? (
          <>
            <i className="fa fa-thumbs-down" aria-hidden="true" /> Không đạt
          </>
        ) : (
          'Chưa có kết quả'
        );
      },
    },
    {
      name: 'Thao tác',
      selector: (row) => {
        const currentCriteria = _.find(verificationCriterias, (item) => item.criteriaDetailId === row.id);
        if (!currentCriteria) {
          return null;
        }
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <a style={{ marginBottom: '4px' }} onClick={() => markCompliance(currentCriteria.id, true)}><i className="fa fa-check-square-o" aria-hidden="true" />Đồng ý</a>
            <a onClick={() => markCompliance(currentCriteria.id, false)}><i className="fa fa-times-circle" aria-hidden="true" />Không đồng ý</a>
          </div>
        )
      },
      wrap: true,
    },
  ];

  return (
    <div>
      <DataTable
        striped
        highlightOnHover
        noHeader
        columns={columns}
        data={filteredCriteriaDetails}
      />
    </div>
  );
};

export default CriteriaDetailList;
