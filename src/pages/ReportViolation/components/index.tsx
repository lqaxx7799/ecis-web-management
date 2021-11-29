import { FileIcon, TrashIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Helmet from "react-helmet";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyActions from "../../../common/actions/company.action";
import violationReportActions from "../../../common/actions/violationReport.action";
import FileInfo from "../../../common/components/FileInfo";
import fileServices from "../../../common/services/file.services";
import { ViolationReportDTO } from "../../../types/dto";
import { ViolationReportDocument } from "../../../types/models";

type Props = {

};

type ViolationReportDTOTemp = {
  description: string;
  companyId: string; 
  reportAgentId: number; 
  violationReportDocuments: Partial<ViolationReportDocument>[];
};

const ReportViolation = (props: Props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { companies } = useAppSelector((state) => state.company);
  const { agent } = useAppSelector((state) => state.authentication);
  const [submitting, setSubmitting] = useState(false);
  
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm<ViolationReportDTOTemp>();
  const watcher = watch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'violationReportDocuments',  
  });

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(companyActions.getAll());
  }, [dispatch]);

  const showFileDialog = () => {
    fileRef.current?.click();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      Promise.all(Array.from(files).map((file) => fileServices.uploadFile(file)))
        .then((result) => {
          _.forEach(result, (item) => {
            append({
              documentName: item.name,
              documentType: item.type,
              documentUrl: item.url,
              documentSize: item.size,
            });
          });
        })
        .catch(() => {
          toast.error('Đã xảy ra lỗi trong quá trình tải tập tin. Vui lòng thử lại sau.');
        });
    }
  };

  const onSubmit = (data: ViolationReportDTOTemp) => {
    if (data.companyId === '-- Chọn doanh nghiệp --') {
      setError('companyId', { message: 'Không được để trống doanh nghiệp' });
      return;
    }
    const formattedData: ViolationReportDTO = {
      ...data,
      companyId: parseInt(data.companyId),
      reportAgentId: agent?.id ?? 0,
    };
    setSubmitting(true);
    dispatch(violationReportActions.create(formattedData))
      .then(() => {
        setSubmitting(false);
        toast.success('Gửi báo cáo vi phạm thành công.');
        history.push('/company');
      })
      .catch(() => {
        setSubmitting(false);
        toast.error('Đã xảy ra lỗi trong quá trình gửi báo cáo vi phạm. Vui lòng thử lại sau.');
      });
  };

  const selectedCompany = _.find(companies, (company) => company.id === parseInt(watcher.companyId));

  return (
    <div className="row">
      <Helmet>
        <title>Báo cáo sai phạm của doanh nghiệp</title>
      </Helmet>
      <div className="x_panel">
        <div className="x_title">
          <h2>Báo cáo sai phạm của doanh nghiệp</h2>
          <div className="clearfix"></div>
        </div>
        <div className="x_content">
          <div className="clearfix"></div>
          <div className="col-xs-12 table">
            <form className="form-horizontal form-label-left" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Doanh nghiệp</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="companyId"
                    control={control}
                    rules={{ required: 'Không được để trống doanh nghiệp' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <select
                          {...field}
                          ref={ref}
                          className="form-control"
                        >
                          <option value={undefined}>-- Chọn doanh nghiệp --</option>
                          {
                            _.map(companies, (company) => (
                              <option key={company.id} value={company.id}>
                                {company.companyNameVI} ({company.companyCode})
                              </option>
                            ))
                          }
                        </select>    
                        {errors.companyId && <span>{errors.companyId.message}</span>}
                      </div>
                    )}
                  />
                  {
                    watcher.companyId && selectedCompany && (
                      <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                        Loại doanh nghiệp: {selectedCompany?.companyType?.typeName ?? 'Chưa đánh giá'}
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Mô tả</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <textarea
                          {...field}
                          ref={ref}
                          rows={10}
                          cols={30}
                          className="form-control"
                        />
                        {errors.description && <span>{errors.description.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Tải tài liệu</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={fileRef}
                    multiple
                    onChange={handleFileUpload}
                  />
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={showFileDialog}
                    style={{ marginBottom: '12px' }}
                  >
                    Tải tập tin
                  </button>

                  <div style={{ width: '400px' }}>
                    {fields.map((field, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                          <FileIcon /> {field.documentName}
                        </div>
                        
                        <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                          <TrashIcon /> Gỡ tài liệu
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <div className="col-md-6 col-md-offset-3">
                  <Link to="/company" className="btn btn-primary">Hủy bỏ</Link>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={submitting}
                  >
                    Thực hiện
                  </button>
                </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViolation;
