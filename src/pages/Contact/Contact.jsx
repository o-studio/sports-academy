import "./Contact.css";

const Contact = ({props}) => {
  const {Config, Imports} = props;
  const {Components, Helpers} = Imports;
  
  Helpers.Title(`${Config.AppName} | اتصل بنا`);

  return (
    <Components.Layout header={Config.nav} >
      صفحة اتصل بنا
    </Components.Layout>
  )
};
export default Contact;