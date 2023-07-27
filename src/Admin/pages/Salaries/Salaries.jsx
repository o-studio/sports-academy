import "./Salaries.css";

const Salaries = ({props}) => {
  const {Config, Imports} = props;
  const {Components, Helpers} = Imports;
  
  Helpers.Title(`${Config.AppName} | صفحة المرتبات`);

  return (
    <Components.Layout  header={Config.nav} >
      صفحة المرتبات
    </Components.Layout>
  )
};
export default Salaries;