import dayjs from "dayjs";
import _ from "lodash";
import { useEffect } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import thirdPartyActions from "../../../common/actions/thirdParty.action";
import { ThirdParty } from "../../../types/models";

type Props = {

};

const ThirdPartyManagement = (props: Props) => {
  const dispatch = useAppDispatch();

  const { loading, thirdParties } = useAppSelector((state) => state.thirdParty);
  const { role } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(thirdPartyActions.getAll());
  }, [dispatch]);

  const columns: IDataTableColumn<ThirdParty>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Tên người dùng',
      selector: (row) => _.get(row, 'userName'),
    },
    {
      name: 'Email',
      selector: (row) => _.get(row, 'account.email'),
    },
    {
      name: 'Trạng thái',
      selector: (row) => _.get(row, 'isActive') ? 'Đang hoạt động' : 'Tạm dừng',
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
          <Link className="btn btn-default" to={`/third-party/${row.id}`}>Xem chi tiết</Link>
        </div>
      ),
    },
  ];

  return (
    <div className="x_panel">
      <Helmet>
        <title>Quản lý bên thụ hưởng</title>
      </Helmet>
      <div className="x_title">
        <h2>Quản lý bên thụ hưởng</h2>
        <div className="clearfix"></div>
      </div>
      <div className="x_content">
        <div className="clearfix"></div>
        <div className="col-xs-12 table">
          {
            _.get(role, 'roleName') === 'Admin' && (
              <div>
                <Link className="btn btn-primary" to="/third-party/create">
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
            data={thirdParties}
            noDataComponent="Không có dữ liệu"
          />
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyManagement;
