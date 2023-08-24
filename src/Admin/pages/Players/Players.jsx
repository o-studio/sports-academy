import "./Players.css";

const Players = ({ props }) => {
  const { Config, Imports } = props;
  const { Components, Helpers } = Imports;

  Helpers.Title(`${Config.AppName} | صفحة اللاعبين`, true);

  return (
    <Components.AdminAccess>
      <Components.Layout header={Config.nav}>صفحة اللاعبين</Components.Layout>
    </Components.AdminAccess>
  );
};
export default Players;
