import { LoadingOverlay, Title } from "@mantine/core";
import { Helmet } from "react-helmet";

type Props = {

};

const CompanyTypeModificationResult = (props: Props) => {
  const loading = false;

  return (
    <div>
      <Helmet>
        <title>Kết quả phân loại doanh nghiệp</title>
      </Helmet>
      <LoadingOverlay visible={loading} />

      <Title order={1}>Kết quả phân loại doanh nghiệp</Title>

      <div style={{ marginTop: '24px' }}>
        
      </div>
    </div>
  );
};

export default CompanyTypeModificationResult;
