import { Button, Group, Modal, Text, Tooltip } from "@mantine/core";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { useAppSelector } from "../../../app/store";
import { VerificationCriteria, VerificationDocument } from "../../../types/models";

type Props = {
  data?: VerificationCriteria;
};

const VerifyPendingProcessCriteria = (props: Props) => {
  const { verificationDocuments } = useAppSelector((state) => state.verificationProcessManagement);

  const viewDocumentDetail = (documentId: number) => {

  };

  const columns: IDataTableColumn<VerificationDocument>[] = [
    {
      name: 'STT',
      width: '50px',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Tên tập tin',
      selector: 'documentName',
    },
    {
      name: 'Thao tác',
      selector: (row) => (
        <Group>
          <Tooltip label="Xem chi tiết">
            <Button onClick={() => viewDocumentDetail(row.id)}><EyeOpenIcon /></Button>
          </Tooltip>
        </Group>
      ),
    },
  ];

  const filteredDocuments = _.filter(
    verificationDocuments, 
    (document) => document.verificationCriteriaId === props.data?.id
  );

  return (
    <div className="criteria-wrapper">
      <DataTable
        columns={columns}
        data={filteredDocuments}
        noDataComponent={<Text>Không có dữ liệu</Text>}
      />
    </div>
  );
};

export default VerifyPendingProcessCriteria;
