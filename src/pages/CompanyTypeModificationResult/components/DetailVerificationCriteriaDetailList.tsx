import _ from "lodash";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { useAppSelector } from "../../../app/store";
import { Criteria, CriteriaDetail } from "../../../types/models";

type Props = {
  data?: Criteria;
};

const DetailVerificationCriteriaDetailList = (props: Props) => {
  const { criteriaDetails } = useAppSelector((state) => state.criteriaDetail);
  const { verificationCriterias } = useAppSelector((state) => state.verificationProcessManagement);

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
      name: 'Nội dung kê khai',
      selector: 'criteriaDetailName',
      width: '200px',
      wrap: true,
      style: { paddingTop: '12px', paddingBottom: '12px' },
    },
    {
      name: 'Kết quả đánh giá',
      selector: (row) => {
        const currentCriteria = _.find(verificationCriterias, (criteria) => criteria.criteriaDetailId === row.id);
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
      name: 'Ý kiến của cục KL',
      selector: (row) => {
        const currentCriteria = _.find(verificationCriterias, (criteria) => criteria.criteriaDetailId === row.id);
        return currentCriteria?.reviewComment;
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

export default DetailVerificationCriteriaDetailList;
