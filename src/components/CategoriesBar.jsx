import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styles/CategoriesBar.css";
import { Link } from "react-router-dom";

export default class CategoriesBar extends Component {
  constructor(props) {
    super();
    const { items } = props;
    this.state = {
      categories: items,
      isOpen: window.innerWidth > 768,
    };
  }

  handleClick = ({ target: { id } }) => {
    const { callback } = this.props;
    callback(id);
  };

  handleOpen = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { categories, isOpen } = this.state;
    return (
      <aside
        className="categories-aside"
      >
        <p onClick={this.handleOpen}>Categorias {isOpen ? "▲" : "▼"}</p>
        {isOpen && (
          <ul className="categories-list">
            {categories.map(({ slug: id, name }) => (
              <Link to="/" onClick={this.handleOpen} key={id}>
                <li
                  className="categories-item"
                  id={id}
                  onClick={this.handleClick}
                  aria-hidden="true"
                  data-testid="category"
                >
                  <p id={id}>{name}</p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </aside>
    );
  }
}

CategoriesBar.propTypes = PropTypes.shape({
  categories: PropTypes.arrayOf(PropTypes.object),
}).isRequired;
