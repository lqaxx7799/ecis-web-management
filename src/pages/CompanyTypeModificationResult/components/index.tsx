import { Button, Group, LoadingOverlay, Select, Text, Title, Tooltip } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { CheckIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyTypeModificationActions from "../../../common/actions/companyTypeModification.action";
import { CompanyTypeModification } from "../../../types/models";

const MONTHS = [
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
];

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
        // notifications.showNotification({
        //   color: 'green',
        //   title: 'Cập nhật thành công',
        //   message: 'Kết quả đánh giá của doanh nghiệp đã được công bố công khai.',
        // });
      })
      .catch(() => {
        // notifications.showNotification({
        //   color: 'red',
        //   title: 'Lỗi hệ thống',
        //   message: 'Có lỗi xảy ra trong quá trình công bố kết quả. Vui lòng thử lại sau.',
        // });
      });
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
      name: 'Kết quả phân loại',
      selector: (row) => row.updatedCompanyType.typeName,
    },
    // {
    //   name: 'Trạng thái',
    //   selector: (row) => row.isAnnounced ? "Đã công bố" : "Chưa công bố"
    // },
    {
      name: 'Hành động',
      cell: (row, index) => (
        <Link to={`/verification-result/${row.id}`} className="btn btn-default">Xem chi tiết</Link>
      ),
    },
  ];

  return (
    <div className="x_panel">
      <Helmet>
        <title>Kết quả phân loại</title>
      </Helmet>
      <div className="x_title">
        <h2>Kết quả phân loại</h2>
        <div className="clearfix"></div>
      </div>
      <div className="x_content">
        <div className="clearfix"></div>
        <div className="col-xs-12 table">

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '12px', paddingLeft: '15px' }}>Chọn thời gian</h3>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
              <select
                className="form-control"
                placeholder="Chọn tháng"
                value={month.toString()}
                onChange={(e) => setMonth(parseInt(e.target.value))}
                style={{ width: '300px', marginRight: '24px' }}
              >
                {_.map(MONTHS, (month) => (
                  <option value={month.value}>{month.label}</option>
                ))}
              </select>
              <select
                className="form-control"
                placeholder="Chọn năm"
                value={year.toString()}
                onChange={(e) => setYear(parseInt(e.target.value))}
                style={{ width: '300px', marginRight: '24px' }}
              >
                {
                  _.map(_.range(new Date().getFullYear(), 2019, -1), (num) => (
                    <option value={num.toString()}>{num}</option>
                  ))
                }
              </select>
              <button
                style={{ marginBottom: '0px' }}
                className="btn btn-default"
                onClick={updateSearch}
              >
                Tìm kiếm
              </button>
            </div>
          </div>

          <DataTable
            noHeader
            striped
            highlightOnHover
            columns={columns}
            data={companyTypeModifications}
            noDataComponent="Không có yêu cầu"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyTypeModificationResult;
