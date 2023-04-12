import React from "react";
class DisplayPaymentsComp extends React.Component {
  render() {
    const { payments } = this.props;
    return (
      <div>
        <ol>
          {payments.map((item) => (
            <li key={item.id}>${item.payment}</li>
          ))}
        </ol>
      </div>
    );
  }
}
export default DisplayPaymentsComp;
