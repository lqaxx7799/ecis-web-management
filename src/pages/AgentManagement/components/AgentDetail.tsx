import dayjs from "dayjs";
import _ from "lodash";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import agentActions from "../../../common/actions/agent.action";
import { DEFAULT_DATE_FORMAT, GENDER_MAPPING } from "../../../common/constants/app";

type Props = {

};

type RouteParams = {
  id: string;
};

const AgentDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id: agentId } = useParams<RouteParams>();
  const { loading, editingAgent, assignments } = useAppSelector((state) => state.agent);

  useEffect(() => {
    const agentIdInt = parseInt(agentId);
    dispatch(agentActions.getById(agentIdInt));
  }, [dispatch, agentId]);

  const mainBody = (
    <div className="col-xs-12 table">
      <h3>Thông tin doanh nghiệp</h3>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th style={{ width: '300px' }}>Họ tên</th>
            <td>{editingAgent?.lastName ?? ''} {editingAgent?.firstName ?? ''}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{editingAgent?.account?.email ?? '-'}</td>
          </tr>
          <tr>
            <th>Giới tính</th>
            <td>{GENDER_MAPPING[editingAgent?.gender ?? ''] ?? '-'}</td>
          </tr>
          <tr>
            <th>Địa chỉ</th>
            <td>{editingAgent?.address ?? '-'}</td>
          </tr>
          <tr>
            <th>Ngày sinh</th>
            <td>{editingAgent?.dateOfBirth ? dayjs(editingAgent?.dateOfBirth).format(DEFAULT_DATE_FORMAT) : '-'}</td>
          </tr>
          <tr>
            <th>Tỉnh phụ trách</th>
            <td>
              <ul>
                {_.map(assignments, (item) => (
                  <li key={item.id}>{item?.province?.provinceName}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="x_panel">
      <Helmet>
        <title>Quản lý kiểm lâm tỉnh</title>
      </Helmet>
      <div className="x_title">
        <h2>Quản lý kiểm lâm tỉnh</h2>
        <div className="clearfix"></div>
      </div>
      <div className="x_breadcrumb">
        <Link className="btn btn-default" to="/agent">Quay lại</Link>
      </div>
      <div className="x_content">
        <div className="clearfix"></div>
        {
          loading ? (<div>Đang tải</div>) : mainBody
        }
      </div>
    </div>
  );
};

export default AgentDetail;
