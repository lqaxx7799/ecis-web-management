import { Button, Group, Modal, Text, Tooltip } from "@mantine/core";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { VerificationCriteria, VerificationDocument } from "../../../../types/models";
import verificationProcessManagementActions from "../../action";

type Props = {
  data?: VerificationCriteria;
};

const VerifyPendingProcessCriteria = (props: Props) => {
  const dispatch = useAppDispatch();
  const { verificationDocuments } = useAppSelector((state) => state.verificationProcessManagement);

  const viewDocumentDetail = (documentId: number) => {
    const document = _.find(verificationDocuments, (item) => item.id === documentId);
    dispatch(verificationProcessManagementActions.changeEditDocumentModalState(true));
    dispatch(verificationProcessManagementActions.editDocument(document));
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
