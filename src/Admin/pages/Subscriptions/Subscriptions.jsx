import "./Subscriptions.css";

const Subscriptions = ({ props }) => {
  const { Config, Imports } = props;
  const { Components, Helpers } = Imports;

  Helpers.Title(`${Config.AppName} | صفحة الاشتراكات`, true);

  return (
    <Components.AdminAccess>
      <Components.Layout header={Config.nav}>صفحة الاشتراكات</Components.Layout>
    </Components.AdminAccess>
  );
};
export default Subscriptions;
