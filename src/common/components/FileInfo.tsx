import { Text } from "@mantine/core";
import { ExternalLinkIcon, FileIcon } from "@radix-ui/react-icons";
import { DefaultExtensionType, defaultStyles } from "react-file-icon";
import config from "../../config";
import { UploadFileResponseDTO } from "../../types/dto";

type Props = {
  data: UploadFileResponseDTO;
};

const FileInfo = ({ data }: Props) => {
  return (
    <span style={{ display: 'flex', alignItems: 'center', marginBottom: '18px' }}>
      <span className="file-icon-24">
        <FileIcon
          extension={data.type}
          {...defaultStyles[data.type as DefaultExtensionType]}
        />
      </span>
      <Text
        variant="link"
        component="a"
        href={`${config.BASE_API}${data.url}`}
        rel="noreffer noopener"
        target="_blank"
      >
        {data.name}
        <ExternalLinkIcon style={{ marginLeft: '4px' }} />
      </Text>
    </span>
  );
};

export default FileInfo;
