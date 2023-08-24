import "./Salaries.css";

const Salaries = ({ props }) => {
  const { Config, Imports } = props;
  const { Components, Helpers } = Imports;

  Helpers.Title(`${Config.AppName} | صفحة المرتبات`, true);

  return (
    <Components.AdminAccess>
      <Components.Layout header={Config.nav}>صفحة المرتبات</Components.Layout>
    </Components.AdminAccess>
  );
};
export default Salaries;
