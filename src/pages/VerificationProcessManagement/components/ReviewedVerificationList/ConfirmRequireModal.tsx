import { Button, Col, Grid, Group, Modal, Radio, RadioGroup, Select, TextInput, Title } from "@mantine/core";
import { DatePicker, TimeInput } from '@mantine/dates';
import { useNotifications } from "@mantine/notifications";
import { RichTextEditor } from '@mantine/rte';
import { UploadIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { ChangeEvent, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import agentActions from "../../../../common/actions/agent.action";
import verificationConfirmRequirementActions from "../../../../common/actions/verificationConfirmRequirement.action";
import FileInfo from "../../../../common/components/FileInfo";
import { VerificationConfirmRequirementActionTypes } from "../../../../common/reducers/verificationConfirmRequirement.reducer";
import fileServices from "../../../../common/services/file.services";
import { VerificationConfirmRequirementDTO } from "../../../../types/dto";

type Props = {
  isOpening: boolean;
  setIsOpening: (state: boolean) => void;
};

const ConfirmRequireModal = (props: Props) => {
  const dispatch = useAppDispatch();
  const notifications = useNotifications();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // const [isUsingFile, setIsUsingFile] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    getValues,
    setValue,
    watch,
  } = useForm<VerificationConfirmRequirementDTO>();
  const watcher = watch();

  const { agents } = useAppSelector((state) => state.agent);
  const { editingProcess, company } = useAppSelector((state) => state.verificationProcessManagement);
 
  useEffect(() => {
    dispatch(agentActions.getAll());
  }, []);

  useEffect(() => {
    if (props.isOpening) {
      setValue('verificationProcessId', editingProcess?.id ?? 0);
      setValue('isUsingAnnounceAgentFile', true);
      setValue('scheduledTime', new Date());
    }
  }, [props.isOpening]);

  const setScheduleLocation = () => {
    // TODO: get company location
    setValue('scheduledLocation', company?.companyCode ?? '');
  };

  const onSelectFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const handleAnnounceFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      fileServices.uploadFile(files[0])
        .then((result) => {
          setValue('announceAgentDocumentName', result.name);
          setValue('announceAgentDocumentType', result.type);
          setValue('announceAgentDocumentUrl', result.url);
          setValue('announceAgentDocumentSize', result.size);
        })
        .catch((err) => {
          notifications.showNotification({
            color: 'red',
            title: 'Lỗi hệ thống',
            message: 'Đã xảy ra lỗi trong quá trình tải tập tin, vui lòng thử lại sau.',
          });
        });
    }
  };

  const onSubmit = (data: VerificationConfirmRequirementDTO) => {
    dispatch(verificationConfirmRequirementActions.create(data))
      .then((result) => {
        props.setIsOpening(false);
        notifications.showNotification({
          color: 'green',
          title: 'Thành công',
          message: 'Thông báo cán bộ thành công',
        });
        dispatch<VerificationConfirmRequirementActionTypes>({
          type: 'VERIFICATION_CONFIRM_REQUIREMENT_EDITING_LOADED',
          payload: result,
        });
      })
      .catch(() => {
        notifications.showNotification({
          color: 'red',
          title: 'Lỗi hệ thống',
          message: 'Đã xảy ra lỗi trong lưu, vui lòng thử lại sau.',
        });
      });
  };

  return (
    <Modal
      size="xl"
      opened={props.isOpening}
      onClose={() => props.setIsOpening(false)}
      title="Yêu cầu cán bộ xác minh"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title order={3}>Thông tin lịch hẹn</Title>
   
        <Controller
          name="scheduledLocation"
          control={control}
          rules={{ required: 'Không được để trống địa điểm' }}
          render={({ field: { ref, ...field } }) => (
            <> 
              <TextInput
                {...field}
                elementRef={ref}
                style={{
                  marginBottom: '12px',
                }}
                label="Địa điểm"
                required
                placeholder="Nhập địa điểm hẹn với doanh nghiệp"
                error={errors.scheduledLocation && errors.scheduledLocation.message}
              />
              <Button
                onClick={setScheduleLocation}
                style={{
                  marginBottom: '12px',
                }}
              >
                Sử dụng địa chỉ của doanh nghiệp
              </Button>
            </>
          )}
        />

        <Grid>
          <Col span={6}>
            <Controller
              name="scheduledTime"
              control={control}
              rules={{ required: 'Không được để trống thời gian' }}
              render={({ field: { ref, ...field } }) => (
                <DatePicker
                  {...field}
                  elementRef={ref}
                  style={{
                    marginBottom: '12px',
                  }}
                  inputFormat="DD/MM/YYYY"
                  label="Thời gian hẹn"
                  required
                  placeholder="Chọn thời gian hẹn với doanh nghiệp"
                  error={errors.scheduledTime && errors.scheduledTime.message}
                  zIndex={1111}
                />
              )}
            />
          </Col>
          <Col span={6}>
            <Controller
              name="scheduledTime"
              control={control}
              rules={{ required: 'Không được để trống giờ hẹn' }}
              render={({ field: { ref, ...field } }) => (
                <TimeInput
                  {...field}
                  elementRef={ref}
                  style={{
                    marginBottom: '12px',
                  }}
                  required
                  label="Giờ hẹn"
                  placeholder="Chọn giờ hẹn với doanh nghiệp"
                  error={errors.scheduledTime && errors.scheduledTime.message}
                />
              )}
            />
          </Col>
        </Grid>

        <Controller
          name="assignedAgentId"
          control={control}
          rules={{ required: 'Không được để trống cán bộ' }}
          render={({ field: { ref, ...field } }) => (
            <Select
              {...field}
              elementRef={ref}
              style={{
                marginBottom: '12px',
              }}
              label="Cán bộ phụ trách"
              required
              placeholder="Chọn cán bộ phụ trách"
              error={errors.assignedAgentId && errors.assignedAgentId.message}
              data={_.map(agents, (agent) => ({
                value: agent.id.toString(),
                label: agent.firstName + ' ' + agent.lastName,
              }))}
            />
          )}
        />

        <Title order={3} style={{ marginTop: '12px' }}>Soạn thảo văn bản thông báo</Title>
        
        <RadioGroup
          style={{
            marginBottom: '12px',
          }}
          label="Chọn cách soạn thảo văn bản"
          value={watcher.isUsingAnnounceAgentFile ? '1' : '0'}
          onChange={(value) => setValue('isUsingAnnounceAgentFile', value === '1')}
        >
          <Radio value="1">Tải tập tin</Radio>
          <Radio value="0">Soạn thảo trực tiếp</Radio>
        </RadioGroup>

        {
          watcher.isUsingAnnounceAgentFile ? (
            <div style={{ marginBottom: '12px' }}>
              {
                getValues('announceAgentDocumentUrl') && (
                  <FileInfo
                    data={{
                      name: watcher.announceAgentDocumentName ?? '',
                      type: watcher.announceAgentDocumentType ?? '',
                      url: watcher.announceAgentDocumentUrl ?? '',
                      size: watcher.announceAgentDocumentSize ?? 0,
                    }}
                  />
                )
              }
              <Button
                leftIcon={<UploadIcon />}
                onClick={onSelectFileDialog}
              >
                Tải tập tin
              </Button>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleAnnounceFileUpload}
              />
            </div>
          ) : (
            <Controller
              name="announceAgentDocumentContent"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <RichTextEditor
                  {...field}
                  // elementRef={ref}
                  controls={[
                    ['bold', 'italic', 'underline', 'link'],
                    ['unorderedList', 'h1', 'h2', 'h3'],
                    ['sup', 'sub'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                  ]}
                  style={{
                    marginBottom: '12px',
                    height: '300px',
                  }}
                />
              )}
            />
          )
        }

        <div style={{ marginTop: '24px' }}>
          <Group>
            <Button type="submit">
              Lưu
            </Button>
            <Button
              type="button"
              variant="light"
              onClick={() => props.setIsOpening(false)}
            >
              Hủy
            </Button>
          </Group>
        </div>
      </form>
    </Modal>
  );
};

export default ConfirmRequireModal;
