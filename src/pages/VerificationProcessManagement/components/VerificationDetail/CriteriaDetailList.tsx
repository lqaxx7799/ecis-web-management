import _ from "lodash";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { Criteria, CriteriaDetail } from "../../../../types/models";
import verificationProcessManagementActions from "../../action";
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
        console.log('ok');
      })
      .catch(() => {
        console.log('error');
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
        return currentCriteria.reviewResult;
      },
    },
    {
      name: 'Góp ý',
      selector: (row) => {
        const currentCriteria = _.find(verificationCriterias, (item) => item.criteriaDetailId === row.id);
        if (!currentCriteria) {
          return null;
        }
        return currentCriteria.reviewComment;
      },
    },
    {
      name: 'Đánh giá',
      selector: (row) => {
        const currentCriteria = _.find(verificationCriterias, (item) => item.criteriaDetailId === row.id);
        if (!currentCriteria) {
          return null;
        }
        return currentCriteria.approvedStatus === 'VERIFIED' ? 'Đồng ý'
          : currentCriteria.approvedStatus === 'REJECTED' ? 'Không đồng ý'
          : 'Chưa đánh giá';
      },
    },
    {
      name: 'Thao tác',
      selector: (row) => (
        <div>
          <a onClick={() => markCompliance(row.id, true)}><i className="fa fa-check-square-o" aria-hidden="true" />Đồng ý</a>
          <a onClick={() => markCompliance(row.id, true)}><i className="fa fa-times-circle" aria-hidden="true" />Không đồng ý</a>
        </div>
      ),
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
