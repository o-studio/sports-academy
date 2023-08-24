import "./Home.css";

const Home = ({props}) => {
  const {Config, Imports} = props;
  const {Components, Helpers} = Imports;
  
  Helpers.Title(`${Config.AppName} | الرئيسية`, true);
  
  return (
    <Components.Layout header={Config.nav} >
      <p style={{height: "120%"}}>الصفحة الرئيسية</p>
    </Components.Layout>
  )
};
export default Home;