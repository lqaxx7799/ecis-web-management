type Props = {

};

const Dashboard = (props: Props) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="x_panel">
          <div className="x_title">
            <h4>Thông tin từ Cục kiểm lâm <small></small></h4>                  
            <div className="clearfix"></div>
          </div>
          <div className="x_content">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div
                // direction="up"
                // scrollamount="2"
                // scrolldelay="2"
                // onmouseover="this.stop()"
                // onmouseout="this.start()"
              >
                <table cellSpacing="0" cellPadding="0" width="100%" style={{ paddingTop: '10px' }}>
                  <tbody>
                    <tr>
                      <td valign="top" style={{ borderBottom: '1px solid white' }}>
                        <table cellPadding="0" cellSpacing="7" width="100%">
                          <tbody>
                            <tr>
                              <td valign="top">
                                <div className="cssDefaultListSummary">
                                  <h5 className="cssExListHeadline3">
                                    <a href="#">Thư chúc mừng của đồng chí Tổng Bí thư, Chủ tịch nước Nguyễn Phú Trọng nhân kỷ niệm 75 năm ngành Lâm nghiệp Việt Nam (1945-2020)</a>
                                  </h5>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" style={{ borderBottom: '1px solid white' }}>
                        <table cellPadding="0" cellSpacing="7" width="100%">
                          <tbody>
                            <tr>
                              <td valign="top">
                                <div className="cssDefaultListSummary">
                                  <h5 className="cssExListHeadline3">
                                    <a href="#">Kỷ niệm 75 năm ngành Lâm nghiệp Việt Nam (1-12-1945 - 1-12-2020)</a>
                                  </h5>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top">
                        <table cellPadding="0" cellSpacing="7" width="100%">
                          <tbody>
                            <tr>
                              <td valign="top">
                                  <div className="cssDefaultListSummary">
                                    <h5 className="cssExListHeadline3">
                                      <a href="#">Bộ Nông nghiệp và Phát triển nông thôn ban hành Quyết định số 4832/QĐ-BNN-TCLN ngày 27/11/2020 về công bố Danh mục các loại gỗ đã nhập khẩu vào Việt Nam và Danh sách vùng địa lý tích cự xuất khẩu gỗ vào Việt Nam</a>
                                    </h5>
                                  </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="x_panel">
          <div className="x_title">
            <h4>Kết quả phân loại<small></small></h4>                  
            <div className="clearfix"></div>
          </div>
          <div className="x_content">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="col-xs-12 table">
                <table className="col-xs-12 table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên tiêu chí</th>
                      <th>Kết quả</th>
                      <th>Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td colSpan={3}>Tuân thủ quy định của pháp luật về hồ sơ khai thác gỗ đối với doanh nghiệp chế biến và xuất khẩu gỗ trực tiếp khai thác gỗ làm nguyên liệu chế biến</td>
                    </tr>
                    <tr>
                      <td>a</td>
                      <td>Chấp hành quy định về trình tự, thủ tục khai thác gỗ</td>
                      <td><strong>Đạt</strong></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>b</td>
                      <td>Bảng kê gỗ theo quy định của pháp luậ</td>
                      <td><strong>Không đạt</strong></td>
                      <td>Nội dung không rõ ràng</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
