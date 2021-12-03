import _ from "lodash";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { useAppSelector } from "../../../../app/store";
import { Criteria } from "../../../../types/models";
import CriteriaDetailList from "./CriteriaDetailList";

type Props = {
  criteriaTypeId: number;
  isSelected: boolean;
};

const CriteriaListTab = (props: Props) => {
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);
  const { criterias } = useAppSelector((state) => state.criteria);
  const {
    verificationCriterias,
  } = useAppSelector((state) => state.verificationProcessManagement);
  const criteriaType = _.find(criteriaTypes, (type) => type.id === props.criteriaTypeId);

  if (!criteriaType) {
    return null;
  }
  
  const filteredCriterias = _.filter(criterias, (criteria) => criteria.criteriaTypeId === props.criteriaTypeId);

  const columns: IDataTableColumn<Criteria>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Nội dung kê khai',
      selector: 'criteriaName',
      wrap: true,
      style: { paddingTop: '12px', paddingBottom: '12px' },
    },
    {
      name: 'Kết quả',
      selector: (row) => {
        const filtered = _.filter(verificationCriterias, (item) => _.get(item, 'criteriaDetail.criteria.id') === row.id);
        const approved = _.filter(filtered, (item) => item.approvedStatus === 'VERIFIED');
        return `${approved.length}/${filtered.length}`;
      },
      wrap: true,
      style: { paddingTop: '12px', paddingBottom: '12px' },
    },
  ];

  return (
    <div className={`tab-pane ${props.isSelected ? 'active' : ''}`} id={`${props.criteriaTypeId}`} role="tabpanel">
      <DataTable
        striped
        highlightOnHover
        noHeader
        columns={columns}
        data={filteredCriterias}
        expandableRows
        expandableRowsComponent={<CriteriaDetailList />}
        className="classify-verification-table"
      />
    </div>
  );
};

export default CriteriaListTab;
