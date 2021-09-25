import { Badge, Button, Group, LoadingOverlay, Text, Title, Tooltip } from "@mantine/core";
import { EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationProcessActions from "../../../common/actions/verificationProcess.action";
import { VerificationProcess } from "../../../types/models";

import '../verificationProcessManagement.scss';

type Props = {

};

const VerificationProcessManagement = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, records } = useAppSelector((state) => state.verificationProcess);

  useEffect(() => {
    dispatch(verificationProcessActions.getAll());
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
      <Title order={1}>Quản lý quá trình tự đánh giá của doanh nghiệp</Title>

      <div style={{ marginTop: '24px' }}>
        <Text className="link-block" variant="link" component={Link} to="/qua-trinh-danh-gia/ho-tro">
          Hỗ trợ doanh nghiệp <Badge color="red">4</Badge>
        </Text>
        <Text className="link-block" variant="link" component={Link} to="/qua-trinh-danh-gia/phan-loai">
          Đánh giá đã hoàn thành <Badge color="red">4</Badge>
        </Text>
        <Text className="link-block" variant="link" component={Link} to="/qua-trinh-danh-gia/lich-su">
          Lịch sử đánh giá
        </Text>
      </div>

      <div style={{ marginTop: '24px' }}>
        <LoadingOverlay visible={loading} />

        <DataTable
          title={<Title order={2}>Quá trình tự đánh giá Tháng {dayjs().format('MM/YYYY')}</Title>}
          columns={columns}
          data={records}
          noDataComponent={<Text>Không có dữ liệu</Text>}
        />
      </div>
    </div>
  );
};

export default VerificationProcessManagement;
