import "./Reports.css";

const Reports = ({props}) => {
  const {Config, Imports} = props;
  const {Components, Helpers} = Imports;
  
  Helpers.Title(`${Config.AppName} | صفحة التقارير`);

  return (
    <Components.Layout  header={Config.nav} >
      صفحة التقارير
    </Components.Layout>
  )
};
export default Reports;