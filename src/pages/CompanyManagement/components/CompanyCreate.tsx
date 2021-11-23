import _ from "lodash";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyActions from "../../../common/actions/company.action";
import provinceActions from "../../../common/actions/province.action";
import { CompanyRegistrationDTO } from "../../../types/dto";

type Props = {

};

type CompanyRegistrationDTOTemp = {
  email: string;
  companyCode: string;
  companyNameVI: string;
  companyNameEN: string;
  provinceId: string;
};

const CompanyCreate = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { provinces } = useAppSelector((state) => state.province);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
  } = useForm<CompanyRegistrationDTOTemp>();

  useEffect(() => {
    dispatch(provinceActions.getAll());
  }, [dispatch]);

  const onSubmit = (data: CompanyRegistrationDTOTemp) => {
    const formattedData: CompanyRegistrationDTO = {
      ...data,
      provinceId: parseInt(data.provinceId),
    };
    dispatch(companyActions.registerCompany(formattedData))
      .then((result) => {
        toast.success('Thêm mới doanh nghiệp thành công');
        history.push('/company');
      })
      .catch((err) => {
        const messageError = _.get(err, 'response.data.message');
        if (messageError === 'EmailAlreadyExisted') {
          setError('email', { message: 'Email đã tồn tại trong hệ thống' });
          return;
        }
        if (messageError === 'CompanyCodeAlreadyExisted') {
          setError('companyCode', { message: 'Mã doanh nghiệp đã tồn tại trong hệ thống' });
          return;
        }
        toast.error('Đã có lỗi xảy ra trong quá trình thêm mới doanh nghiệp. Vui lòng thử lại sau.');
      });
  };

  return (
    <div className="row">
      <Helmet>
        <title>Thêm mới doanh nghiệp</title>
      </Helmet>
      <div className="x_panel">
        <div className="x_title">
          <h2>Thêm mới doanh nghiệp</h2>
          <div className="clearfix"></div>
        </div>
        <div className="x_content">
          <div className="clearfix"></div>
          <div className="col-xs-12 table">
            <form className="form-horizontal form-label-left" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Email (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Không được để trống email' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          className="form-control"
                          placeholder="Nhập email"
                        />
                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Mã doanh nghiệp (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="companyCode"
                    control={control}
                    rules={{ required: 'Không được mã doanh nghiệp' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          className="form-control"
                          placeholder="Nhập mã doanh nghiệp"
                        /> 
                        {errors.companyCode && <span className="text-danger">{errors.companyCode.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Tên doanh nghiệp (Tiếng Việt) (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="companyNameVI"
                    control={control}
                    rules={{ required: 'Không được để trống tên doanh nghiệp (Tiếng Việt)' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          className="form-control"
                          placeholder="Nhập tên doanh nghiệp (Tiếng Việt)"
                        />
                        {errors.companyNameVI && <span className="text-danger">{errors.companyNameVI.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Tên doanh nghiệp (Tiếng Anh)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="companyNameEN"
                    control={control}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          className="form-control"
                          placeholder="Nhập tên doanh nghiệp (Tiếng Anh)"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Tỉnh hoạt động (*)</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="provinceId"
                    control={control}
                    rules={{ required: 'Không được để trống tỉnh hoạt động' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <select
                          {...field}
                          ref={ref}
                          className="form-control"
                        >
                          <option value={undefined}>-- Chọn tỉnh hoạt động --</option>
                          {
                            _.map(provinces, (province) => (
                              <option key={province.id} value={province.id}>{province.provinceName}</option>
                            ))
                          }
                        </select>    
                        {errors.provinceId && <span>{errors.provinceId.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-6 col-md-offset-3">
                  <Link to="/company" className="btn btn-primary">Hủy bỏ</Link>
                  <button type="submit" className="btn btn-success">Thực hiện</button>
                </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
