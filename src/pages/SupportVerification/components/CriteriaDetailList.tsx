import _ from "lodash";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { useAppSelector } from "../../../app/store";
import { Criteria, CriteriaDetail } from "../../../types/models";
import CriteriaForm from "./CriteriaForm";

type Props = {
  data?: Criteria;
};

const CriteriaDetailList = (props: Props) => {
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
      name: 'Nội dung kê khai',
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
      wrap: true,
      width: '240px',
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
