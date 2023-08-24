import "./NotFound.css";

const NotFound = ({ props }) => {
  const { Config, Imports } = props;
  const { Components, Helpers } = Imports;

  Helpers.Title(`${Config.AppName} | الصفحة غير موجودة`, true);

  return (
    <Components.AdminAccess>
      <Components.Layout header={Config.nav}>
        الصفحة غير موجودة
      </Components.Layout>
    </Components.AdminAccess>
  );
};
export default NotFound;
