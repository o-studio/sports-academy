import "./Reports.css";

const Reports = ({ props }) => {
  const { Config, Imports } = props;
  const { Components, Helpers } = Imports;

  Helpers.Title(`${Config.AppName} | صفحة التقارير`, true);

  return (
    <Components.AdminAccess>
      <Components.Layout header={Config.nav}>صفحة التقارير</Components.Layout>
    </Components.AdminAccess>
  );
};
export default Reports;
