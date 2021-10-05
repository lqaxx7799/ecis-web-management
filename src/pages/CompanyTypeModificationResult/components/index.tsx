import { Button, Group, LoadingOverlay, Select, Text, Title, Tooltip } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
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
  const notifications = useNotifications();
  const { companyTypeModifications, loading } = useAppSelector((state) => state.companyTypeModification);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(companyTypeModificationActions.getReportPrivate(month, year));
  }, []);

  const updateSearch = () => {
    dispatch(companyTypeModificationActions.getReportPrivate(month, year));
  };

  const announceReport = (id: number) => {
    const modification = _.find(companyTypeModifications, (item) => item.id === id);
    if (!modification) {
      return;
    }
    const updated: CompanyTypeModification = {
      ...modification,
      isAnnounced: true,
    };
    dispatch(companyTypeModificationActions.update(updated))
      .then(() => {
        notifications.showNotification({
          color: 'green',
          title: 'Cập nhật thành công',
          message: 'Kết quả đánh giá của doanh nghiệp đã được công bố công khai.',
        });
      })
      .catch(() => {
        notifications.showNotification({
          color: 'red',
          title: 'Lỗi hệ thống',
          message: 'Có lỗi xảy ra trong quá trình công bố kết quả. Vui lòng thử lại sau.',
        });
      });
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
      name: 'Phân loại',
      selector: (row) => row.updatedCompanyType.typeName,
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
          <Tooltip label="Xem chi tiết">
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
        <Title order={2} style={{ marginBottom: '12px', paddingLeft: '15px' }}>Chọn thời gian</Title>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
          <Select
            data={[
              { value: '1', label: 'Tháng 1' },
              { value: '2', label: 'Tháng 2' },
              { value: '3', label: 'Tháng 3' },
              { value: '4', label: 'Tháng 4' },
              { value: '5', label: 'Tháng 5' },
              { value: '6', label: 'Tháng 6' },
              { value: '7', label: 'Tháng 7' },
              { value: '8', label: 'Tháng 8' },
              { value: '9', label: 'Tháng 9' },
              { value: '10', label: 'Tháng 10' },
              { value: '11', label: 'Tháng 11' },
              { value: '12', label: 'Tháng 12' },
            ]}
            label="Tháng"
            placeholder="Chọn tháng"
            value={month.toString()}
            onChange={(value) => setMonth(parseInt(value))}
            style={{ width: '300px', marginRight: '24px' }}
          />
          <Select
            data={_.map(_.range(new Date().getFullYear(), 2019, -1), (num) => ({
              value: num.toString(),
              label: num.toString(),
            }))}
            label="Năm"
            placeholder="Chọn năm"
            value={year.toString()}
            onChange={(value) => setYear(parseInt(value))}
            style={{ width: '300px', marginRight: '24px' }}
          />
          <Button
            onClick={updateSearch}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>

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
