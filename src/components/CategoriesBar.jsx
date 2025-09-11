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

  handleClick = (slug) => {
    const { callback } = this.props;
    callback?.(slug);
  };

  handleOpen = (slug) => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }), () => {
      if (slug) this.handleClick(slug);
    });
  };

  render() {
    const { categories, isOpen } = this.state;

    return (
      <aside
        className="categories-aside"
      >
        <p onClick={() => this.handleOpen()}>Categorias {isOpen ? "▲" : "▼"}</p>
        {isOpen && (
          <ul className="categories-list">
            {categories.map(({ slug, name }) => (
              <Link to="/online-store/" onClick={() => this.handleOpen(slug)} key={slug}>
                <li
                  className="categories-item"
                  aria-hidden="true"
                  data-testid="category"
                >
                  <p id={slug}>{name}</p>
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
