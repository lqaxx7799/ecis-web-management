import { Anchor, Breadcrumbs, Title } from "@mantine/core";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

type Props = {

};

const ReportViolation = (props: Props) => {
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

      </div>
    </div>
  );
};

export default ReportViolation;
