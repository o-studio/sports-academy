import "./About.css";

const About =({props}) => {
  const {Config, Imports} = props;
  const {Components, Helpers} = Imports;
  Helpers.Title(`${Config.AppName} | من نحن`);

  return (
    <Components.Layout header={Config.nav} >
      صفحة من نحن
    </Components.Layout>
  )
};
export default About;