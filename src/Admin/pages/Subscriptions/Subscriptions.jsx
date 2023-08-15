import "./Subscriptions.css";

const Subscriptions = ({props}) => {
  const {Config, Imports} = props;
  const {Components, Helpers} = Imports;
  
  Helpers.Title(`${Config.AppName} | صفحة الاشتراكات`);

  return (
    <Components.Layout  header={Config.nav} >
      صفحة الاشتراكات
    </Components.Layout>
  )
};
export default Subscriptions;