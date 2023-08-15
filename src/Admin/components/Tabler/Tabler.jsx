
const Tabler = ({props, options, children}) => {
  const {Config, Imports} = props;
  const {Components, Helpers} = Imports;

  return (
    <>
      <table>
        {children}
        <tfoot>
          <tr style={{gridTemplateColumns: "1fr"}}>
            <td colSpan={options.colSpan}>
               <Components.HiPager
                amount={options.amount}
                onPageChange={(page) => options.onPageChange(page)}
                options={{
                  defaultPage: options.defaultPage,
                  perPage: options.perPage,
                  buttonsToShow: 3
                }}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Tabler;