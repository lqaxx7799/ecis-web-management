import dayjs from "dayjs";
import _ from "lodash";
import { useEffect } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import agentActions from "../../../common/actions/agent.action";
import { Agent } from "../../../types/models";

type Props = {

};

const AgentManagement = (props: Props) => {
  const dispatch = useAppDispatch();

  const { loading, agents } = useAppSelector((state) => state.agent);
  const { role } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(agentActions.getAllAgents());
  }, [dispatch]);

  const columns: IDataTableColumn<Agent>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Họ tên',
      selector: (row) => `${_.get(row, 'lastName')} ${_.get(row, 'firstName')}`,
    },
    {
      name: 'Email',
      selector: (row) => _.get(row, 'account.email'),
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
          <Link className="btn btn-default" to={`/agent/${row.id}`}>Xem chi tiết</Link>
        </div>
      ),
    },
  ];

  return (
    <div className="x_panel">
      <Helmet>
        <title>Quản lý kiểm lâm tỉnh</title>
      </Helmet>
      <div className="x_title">
        <h2>Quản lý kiểm lâm tỉnh</h2>
        <div className="clearfix"></div>
      </div>
      <div className="x_content">
        <div className="clearfix"></div>
        <div className="col-xs-12 table">
          {
            _.get(role, 'roleName') === 'Admin' && (
              <div>
                <Link className="btn btn-primary" to="/agent/create">
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
            data={agents}
            noDataComponent="Không có dữ liệu"
          />
        </div>
      </div>
    </div>
  );
};

export default AgentManagement;
