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
  const { role } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(companyActions.getAll());
  }, [dispatch]);

  const columns: IDataTableColumn<Company>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Doanh nghiệp',
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
        <div>
          <Link className="btn btn-default" to={`/company/${row.id}`}>Xem chi tiết</Link>
        </div>
      ),
    },
  ];

  return (
    <div className="x_panel">
      <Helmet>
        <title>Quản lý doanh nghiệp</title>
      </Helmet>
      <div className="x_title">
        <h2>Quản lý doanh nghiệp</h2>
        <div className="clearfix"></div>
      </div>
      <div className="x_content">
        <div className="clearfix"></div>
        <div className="col-xs-12 table">
          {
            _.get(role, 'roleName') === 'Admin' && (
              <div>
                <Link className="btn btn-primary" to="/company/create">
                  Thêm mới
                </Link>
              </div>
            )
          }
          <DataTable
            noHeader
            striped
            highlightOnHover
            columns={columns}
            data={companies}
            noDataComponent="Không có dữ liệu"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyManagement;
