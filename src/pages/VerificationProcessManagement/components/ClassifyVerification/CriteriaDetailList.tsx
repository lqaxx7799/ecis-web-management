import _ from "lodash";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { useAppSelector } from "../../../../app/store";
import { Criteria, CriteriaDetail } from "../../../../types/models";

type Props = {
  data?: Criteria;
};

const CriteriaDetailList = (props: Props) => {
  const {
    verificationCriterias,
  } = useAppSelector((state) => state.verificationProcessManagement);
  const { criteriaDetails } = useAppSelector((state) => state.criteriaDetail);

  if (!props.data) {
    return null;
  }
  
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
      name: 'Kết quả',
      selector: (row) => {
        const currentCriteria = _.find(verificationCriterias, (item) => item.criteriaDetailId === row.id);
        if (!currentCriteria) {
          return null;
        }
        return currentCriteria.reviewResult;
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
        return currentCriteria.reviewComment;
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
        return currentCriteria.approvedStatus === 'VERIFIED' ? 'Đồng ý'
          : currentCriteria.approvedStatus === 'REJECTED' ? 'Không đồng ý'
          : 'Chưa đánh giá';
      },
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
