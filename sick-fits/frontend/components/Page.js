import React from "react";
import Header from "../components/Header";

class Page extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
