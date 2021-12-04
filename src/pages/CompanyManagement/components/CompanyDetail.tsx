import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyActions from "../../../common/actions/company.action";
import companyTypeModificationActions from "../../../common/actions/companyTypeModification.action";
import verificationProcessActions from "../../../common/actions/verificationProcess.action";
import { MODIFICATION_TYPE } from "../../../common/constants/app";
import { CompanyTypeModification } from "../../../types/models";

type Props = {

};

type RouteParams = {
  id: string;
};

const CompanyDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id: companyId } = useParams<RouteParams>();
  const { loading, editingCompany } = useAppSelector((state) => state.company);
  const { records: verifications } = useAppSelector((state) => state.verificationProcess);
  const { companyTypeModifications } = useAppSelector((state) => state.companyTypeModification);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const companyIdInt = parseInt(companyId);
    dispatch(companyActions.getById(companyIdInt));
    dispatch(verificationProcessActions.getAllByCompany(companyIdInt));
    dispatch(companyTypeModificationActions.getByCompanyId(companyIdInt));
  }, [dispatch, companyId]);

  const pendingVerification = _.find(verifications, (verification) => !verification.isFinished);

  const generateVerification = () => {
    if (pendingVerification) {
      return;
    }
    setGenerating(true);
    dispatch(verificationProcessActions.generate(parseInt(companyId)))
      .then(() => {
        toast.success('Tạo yêu cầu đánh giá thành công.');
        setGenerating(false);
      })
      .catch(() => {
        toast.error('Đã xảy ra lỗi trong quá trình tạo yêu cầu đánh giá. Vui lòng thử lại sau.');
        setGenerating(false);
      });
  };

  const modificationColumns: IDataTableColumn<CompanyTypeModification>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Thời gian hoàn thành',
      selector: 'createdAt',
      format: (row) => dayjs(row.createdAt).format('DD/MM/YYYY'),
      width: '150px',
    },
    {
      name: 'Loại',
      selector: (row) => MODIFICATION_TYPE[row.modification] ?? '-',
      width: '150px',
    },
    {
      name: 'Kết quả phân loại',
      selector: (row) => `Chuyển từ ${row.previousCompanyType?.typeName ?? 'Chưa đánh giá'} sang ${row.updatedCompanyType?.typeName ?? 'Chưa đánh giá'}`,
    },
    {
      name: 'Thao tác',
      selector: (row) => (
        <div>
          <Link className="btn btn-default" to={`/company/modification/${row.id}`}>Xem chi tiết</Link>
        </div>
      ),
    },
  ];


  const mainBody = (
    <div className="col-xs-12 table">
      <h3>Thông tin doanh nghiệp</h3>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th style={{ width: '300px' }}>Tên doanh nghiệp (Tiếng Việt)</th>
            <td>{editingCompany?.companyNameVI}</td>
          </tr>
          <tr>
            <th>Tên doanh nghiệp (Tiếng Anh)</th>
            <td>{editingCompany?.companyNameEN ?? '-'}</td>
          </tr>
          <tr>
            <th>Mã doanh nghiệp</th>
            <td>{editingCompany?.companyCode}</td>
          </tr>
          <tr>
            <th>Loại hiện tại</th>
            <td>{editingCompany?.companyType?.typeName ?? 'Chưa đánh giá'}</td>
          </tr>
        </tbody>
      </table>

      <h3>Quá trình đánh giá</h3>
      <DataTable
        striped
        highlightOnHover
        noHeader
        columns={modificationColumns}
        data={companyTypeModifications}
        noDataComponent="Không có dữ liệu"
      />

      <div style={{ marginTop: '24px' }}>
        <button
          className="btn btn-primary"
          onClick={generateVerification}
          disabled={!!pendingVerification || generating}
        >
          Yêu cầu đánh giá
        </button>
      </div>
    </div>
  );

  return (
    <div className="x_panel">
      <Helmet>
        <title>Quản lý doanh nghiệp</title>
      </Helmet>
      <div className="x_title">
        <h2>Quản lý doanh nghiệp</h2>
        <div className="clearfix"></div>
      </div>
      <div className="x_breadcrumb">
        <Link className="btn btn-default" to="/company">Quay lại</Link>
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

export default CompanyDetail;
