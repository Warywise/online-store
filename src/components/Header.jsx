import React from "react";
import PropTypes from "prop-types";
import ButtonListCart from "./ButtonListCart";
import "../styles/Header.css";

export default class Header extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <header>
        <span className="tos-logo" />
        <h3>Trybers Online Store</h3>
        <ButtonListCart items={items} />
      </header>
    );
  }
}

Header.propTypes = { items: PropTypes.arrayOf(PropTypes.object).isRequired };
