import { Button, Group, LoadingOverlay, Text, Title, Tooltip } from "@mantine/core";
import { CheckIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyTypeModificationActions from "../../../common/actions/companyTypeModification.action";
import { CompanyTypeModification } from "../../../types/models";

type Props = {

};

const CompanyTypeModificationResult = (props: Props) => {
  const dispatch = useAppDispatch();
  const { companyTypeModifications, loading } = useAppSelector((state) => state.companyTypeModification);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(companyTypeModificationActions.getReportPrivate(month, year));
  }, []);

  const announceReport = (id: number) => {

  };

  const viewDetail = (id: number) => {

  };

  const columns: IDataTableColumn<CompanyTypeModification>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
      width: '50px',
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
      selector: (row) => row.isAnnounced ? "Đã công bố" : "Chưa công bố"
    },
    {
      name: 'Hành động',
      cell: (row, index) => (
        <Group>
          <Tooltip label="Công bố">
            <Button
              disabled={row.isAnnounced}
              onClick={() => announceReport(row.id)}
            >
              <CheckIcon />
            </Button>
          </Tooltip>
          <Tooltip label="Công bố">
            <Button onClick={() => viewDetail(row.id)}>
              <EyeOpenIcon />
            </Button>
          </Tooltip>
        </Group>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Kết quả phân loại doanh nghiệp</title>
      </Helmet>
      <LoadingOverlay visible={loading} />

      <Title order={1}>Kết quả phân loại doanh nghiệp</Title>

      <div style={{ marginTop: '24px' }}>
        <DataTable
          title={<Title order={2}>Danh sách</Title>}
          columns={columns}
          data={companyTypeModifications}
          noDataComponent={<Text>Không có dữ liệu</Text>}
        />
      </div>
    </div>
  );
};

export default CompanyTypeModificationResult;
