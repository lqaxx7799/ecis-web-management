import { Button, Group, LoadingOverlay, Text, Title, Tooltip } from "@mantine/core";
import { EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyActions from "../../../common/actions/company.action";
import { Company } from "../../../types/models";

type Props = {

};

const CompanyManagement = (props: Props) => {
  const dispatch = useAppDispatch();

  const { loading, companies } = useAppSelector((state) => state.company);

  useEffect(() => {
    dispatch(companyActions.getAll());
  }, [dispatch]);

  const columns: IDataTableColumn<Company>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Công ty',
      selector: (row) => `${_.get(row, 'companyNameVI')} (${_.get(row, 'companyCode')})`,
    },
    {
      name: 'Thời gian tạo',
      selector: 'createdAt',
      format: (row) => dayjs(row.createdAt).format('DD/MM/YYYY'),
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
        <title>Quản lý doanh nghiệp</title>
      </Helmet>
      <Title order={1}>Quản lý doanh nghiệp</Title>

      <LoadingOverlay visible={loading} />

      <div style={{ marginTop: '24px' }}>
        <Text className="link-block" variant="link" component={Link} to="/doanh-nghiep/bao-cao">
          Báo cáo vi phạm
        </Text>
      </div>

      <div style={{ marginTop: '24px' }}>
        <DataTable
          title={<Title order={2}>Danh sách doanh nghiệp</Title>}
          data={companies}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default CompanyManagement;
