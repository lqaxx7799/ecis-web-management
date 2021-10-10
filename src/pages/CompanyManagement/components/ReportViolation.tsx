import { Anchor, Breadcrumbs, Button, Select, Text, Textarea, Title, Tooltip } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { TrashIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { ChangeEvent, useEffect, useRef } from "react";
import Helmet from "react-helmet";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
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
  const notifications = useNotifications();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { companies } = useAppSelector((state) => state.company);
  const { agent } = useAppSelector((state) => state.authentication);
  
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
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
          notifications.showNotification({
            color: 'red',
            title: 'Lỗi hệ thống',
            message: 'Đã xảy ra lỗi trong quá trình tải tập tin, vui lòng thử lại sau.',
          });
        });
    }
  };

  const onSubmit = (data: ViolationReportDTOTemp) => {
    const formattedData: ViolationReportDTO = {
      ...data,
      companyId: parseInt(data.companyId),
      reportAgentId: agent?.id ?? 0,
    };
    dispatch(violationReportActions.create(formattedData))
      .then(() => {
        notifications.showNotification({
          color: 'green',
          title: 'Gửi báo cáo thành công',
          message: 'Gửi báo cáo vi phạm thành công.',
        });
        history.push('/doanh-nghiep');
      })
      .catch(() => {
        notifications.showNotification({
          color: 'red',
          title: 'Lỗi hệ thống',
          message: 'Đã xảy ra lỗi trong quá trình gửi báo cáo vi phạm, vui lòng thử lại sau.',
        });
      })
  };

  const selectedCompany = _.find(companies, (company) => company.id === parseInt(watcher.companyId));

  return (
    <div>
      <Helmet>
        <title>Báo cáo vi phạm</title>
      </Helmet>

      <Title>Báo cáo vi phạm</Title>
      <div style={{ marginTop: '12px' }}>
        <Breadcrumbs>
          <Anchor component={Link} to="/">Trang chủ</Anchor>
          <Anchor component={Link} to="/doanh-nghiep">Quản lý doanh nghiệp</Anchor>
        </Breadcrumbs>
      </div>

      <div style={{ marginTop: '24px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="companyId"
            control={control}
            rules={{ required: 'Không được để trống doanh nghiệp' }}
            render={({ field: { ref, ...field } }) => (
              <Select
                {...field}
                elementRef={ref}
                style={{
                  marginBottom: '12px',
                }}
                label="Doanh nghiệp"
                required
                placeholder="Doanh nghiệp"
                error={errors.companyId && errors.companyId.message}
                data={_.map(companies, (company) => ({
                  value: company.id.toString(),
                  label: `${company.companyNameVI} (${company.companyCode})`,
                }))}
              />
            )}
          />

          {
            watcher.companyId && selectedCompany && (
              <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                Loại doanh nghiệp: {selectedCompany?.companyType?.typeName ?? 'Chưa đánh giá'}
              </div>
            )
          }

          <Controller
            name="description"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <Textarea
                {...field}
                elementRef={ref}
                style={{
                  marginBottom: '12px',
                }}
                label="Mô tả vấn đề"
                placeholder="Mô tả vấn đề bằng 1-2 câu"
                error={errors.description && errors.description.message}
              />
            )}
          />

          <Title order={3} style={{ marginTop: '12px' }}>Tải tài liệu</Title>
          <Text style={{ marginBottom: '12px' }}>
            Tải lên tài liệu xác minh sai phạm của doanh nghiệp trong quá trình nhập khẩu, sản xuất, chế biến gỗ.
          </Text>

          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileRef}
            multiple
            onChange={handleFileUpload}
          />
          <Button
            onClick={showFileDialog}
            style={{ marginBottom: '12px' }}
          >
            Tải tập tin
          </Button>

          <div style={{ width: '400px' }}>
            {fields.map((field, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <FileInfo
                  data={{
                    name: field.documentName ?? '',
                    type: field.documentType ?? '',
                    url: field.documentUrl ?? '',
                    size: field.documentSize ?? 0,
                  }}
                />
                <Tooltip
                  label="Gỡ tài liệu"
                >
                  <Button onClick={() => remove(index)}>
                    <TrashIcon />
                  </Button>
                </Tooltip>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            style={{ marginTop: '12px' }}
          >
            Gửi báo cáo
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReportViolation;
