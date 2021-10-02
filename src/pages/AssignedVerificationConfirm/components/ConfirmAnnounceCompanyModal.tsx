import { Button, Group, Modal, Radio, RadioGroup, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { RichTextEditor } from '@mantine/rte';
import { UploadIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { ChangeEvent, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationConfirmRequirementActions from "../../../common/actions/verificationConfirmRequirement.action";
import FileInfo from "../../../common/components/FileInfo";
import { VerificationConfirmRequirementActionTypes } from "../../../common/reducers/verificationConfirmRequirement.reducer";
import fileServices from "../../../common/services/file.services";
import { VerificationConfirmUpdateDTO } from "../../../types/dto";

type Props = {
  isOpening: boolean;
  onClose: () => void;
};

const ConfirmAnnounceCompanyModal = (props: Props) => {
  const dispatch = useAppDispatch();
  const notifications = useNotifications();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm<VerificationConfirmUpdateDTO>();
  const watcher = watch();

  const { editingRequirement } = useAppSelector((state) => state.verificationConfirmRequirement);

  useEffect(() => {
    if (props.isOpening) {
      setValue('verificationConfirmRequirementId', editingRequirement?.id ?? 0);
      setValue('isUsingFile', editingRequirement?.isUsingAnnounceCompanyFile);
      setValue('documentContent', editingRequirement?.announceCompanyDocumentContent ?? '');
      setValue('documentSize', editingRequirement?.announceCompanyDocumentSize);
      setValue('documentType', editingRequirement?.announceCompanyDocumentType);
      setValue('documentName', editingRequirement?.announceCompanyDocumentName);
    }
  }, [props.isOpening]);

  const onSelectFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const handleAnnounceFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      fileServices.uploadFile(files[0])
        .then((result) => {
          setValue('documentName', result.name);
          setValue('documentType', result.type);
          setValue('documentUrl', result.url);
          setValue('documentSize', result.size);
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

  const onSubmit = (data: VerificationConfirmUpdateDTO) => {
    dispatch(verificationConfirmRequirementActions.announceCompany(data))
      .then((result) => {
        props.onClose();
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
      onClose={() => props.onClose()}
      title="Yêu cầu cán bộ xác minh"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title order={3} style={{ marginTop: '12px' }}>Soạn thảo văn bản thông báo</Title>
        <RadioGroup
          style={{
            marginBottom: '12px',
          }}
          label="Chọn cách soạn thảo văn bản"
          value={watcher.isUsingFile ? '1' : '0'}
          onChange={(value) => setValue('isUsingFile', value === '1')}
        >
          <Radio value="1">Tải tập tin</Radio>
          <Radio value="0">Soạn thảo trực tiếp</Radio>
        </RadioGroup>

        {
          watcher.isUsingFile ? (
            <div style={{ marginBottom: '12px' }}>
              {
                getValues('documentUrl') && (
                  <FileInfo
                    data={{
                      name: watcher.documentName ?? '',
                      type: watcher.documentType ?? '',
                      url: watcher.documentUrl ?? '',
                      size: watcher.documentSize ?? 0,
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
              name="documentContent"
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
              onClick={() => props.onClose()}
            >
              Hủy
            </Button>
          </Group>
        </div>
      </form>
    </Modal>
  );
};

export default ConfirmAnnounceCompanyModal;
