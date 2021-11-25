import { Button, Group, List, Modal, Text, Tooltip } from "@mantine/core";
import { ExternalLinkIcon, EyeOpenIcon, FileIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { DefaultExtensionType, defaultStyles } from "react-file-icon";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { DEFAULT_DATETIME_FORMAT } from "../../../../common/constants/app";
import helpers from "../../../../common/utils/helpers";
import config from "../../../../config";
import { VerificationCriteria, VerificationDocument } from "../../../../types/models";
import verificationProcessManagementActions from "../../action";

type Props = {
  data?: VerificationCriteria;
};

const VerifyPendingProcessCriteria = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    verificationDocuments,
    documentReviews,
  } = useAppSelector((state) => state.verificationProcessManagement);

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
      selector: (row) => (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <span className="file-icon-24">
            <FileIcon
              extension={row.resourceType}
              {...defaultStyles[row.resourceType as DefaultExtensionType]}
            />
          </span>
          <Text
            variant="link"
            component="a"
            href={`${config.BASE_API}${row.resourceUrl}`}
            rel="noreffer noopener"
            target="_blank"
          >
            {row.documentName}
            <ExternalLinkIcon style={{ marginLeft: '4px' }} />
          </Text>
        </span>
      ),
    },
    {
      name: 'Kích thước tệp',
      width: '130px',
      selector: (row) => helpers.bytesToSize(row.resourceSize ?? 0),
    },
    {
      name: 'Ngày tải lên',
      width: '160px',
      selector: (row) => dayjs(row.createdAt).format(DEFAULT_DATETIME_FORMAT),
    },
    {
      name: 'Đánh giá',
      selector: (row) => {
        const reviews = _.filter(documentReviews, (review) => review.verificationDocumentId === row.id);
        return (
          <List>
            {
              _.map(reviews, (review) => (
                <List.Item key={review.id}>{review.content}</List.Item>
              ))
            }
          </List>
        );
      },
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
