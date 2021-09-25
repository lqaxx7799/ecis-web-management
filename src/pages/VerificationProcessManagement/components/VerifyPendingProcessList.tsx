import { Anchor, Breadcrumbs, Button, Group, LoadingOverlay, Text, Title, Tooltip } from "@mantine/core";
import { EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationProcessActions from "../../../common/actions/verificationProcess.action";
import { VerificationProcess } from "../../../types/models";

type Props = {

};

const VerifyPendingProcessList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, records } = useAppSelector((state) => state.verificationProcess);

  useEffect(() => {
    dispatch(verificationProcessActions.getAllPending());
  }, []);

  const columns: IDataTableColumn<VerificationProcess>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Công ty',
      selector: (row) => `${_.get(row, 'company.companyNameVI')} (${_.get(row, 'company.companyCode')})`,
    },
    {
      name: 'Thời gian tạo',
      selector: 'createdAt',
      format: (row) => dayjs(row.createdAt).format('DD/MM/YYYY'),
    },
    {
      name: 'Trạng thái',
      selector: 'status',
    },
    {
      name: 'Hành động',
      cell: (row, index) => (
        <Group>
          <Tooltip label="Xem chi tiết">
            <Button><EyeOpenIcon /></Button>
          </Tooltip>
          <Tooltip label="Cập nhật">
            <Button><Pencil2Icon /></Button>
          </Tooltip>
        </Group>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Phân loại doanh nghiệp</title>
      </Helmet>

      <Title order={1}>
        Phân loại doanh nghiệp
      </Title>

      <div style={{ marginTop: '12px' }}>
        <Breadcrumbs>
          <Anchor component={Link} to="/">Trang chủ</Anchor>
          <Anchor component={Link} to="/qua-trinh-danh-gia">Quá trình đánh giá</Anchor>
        </Breadcrumbs>
      </div>

      <div style={{ marginTop: '24px' }}>
        <LoadingOverlay visible={loading} />

        <DataTable
          // title={<Title order={2}>Quá trình tự đánh giá</Title>}
          columns={columns}
          data={records}
          noDataComponent={<Text>Không có dữ liệu</Text>}
        />
      </div>
    </div>
  );
};

export default VerifyPendingProcessList;
