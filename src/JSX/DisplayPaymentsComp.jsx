import React from "react";
class DisplayPaymentsComp extends React.Component {
  render() {
    const { payments } = this.props;
    return (
      <div>
        <ul>
          {payments.map((item) => (
            <li key={item.id}>${item.payment}</li>
          ))}
        </ul>
      </div>
    );
  }
}
export default DisplayPaymentsComp;
