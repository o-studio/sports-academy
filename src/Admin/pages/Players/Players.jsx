import "./Players.css";

const Players = ({props}) => {
  const {Config, Imports} = props;
  const {Components, Helpers} = Imports;
  
  Helpers.Title(`${Config.AppName} | صفحة اللاعبين`);

  return (
    <Components.Layout  header={Config.nav} >
      صفحة اللاعبين
    </Components.Layout>
  )
};
export default Players;