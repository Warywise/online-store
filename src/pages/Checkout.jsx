import React from "react";
import PropTypes from "prop-types";
import "../styles/CheckoutStyles.css";
import { Redirect } from "react-router";

export default class Checkout extends React.Component {
  constructor() {
    super();
    this.state = { finish: false };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ finish: true });
    this.props.finish();
  };

  render() {
    const {
      props: { cartItems },
      state: { finish },
    } = this;

    return (
      <section className="checkout">
        <div className="checkout-list">
          {cartItems.map(({ thumbnail, id, title, price, quantity }) => (
            <div key={id} className="checkout-items">
              <h5>{title}</h5>
              <img src={thumbnail} alt={title} />
              <p>
                {Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL",
                }).format(price)}
                <b> X </b>
                {quantity}
              </p>
            </div>
          ))}
        </div>
        <form className="checkout-form" onSubmit={this.handleClick}>
          <label className="checkout-inputs" htmlFor="fullname">
            Nome:
            <input
              id="fullname"
              type="text"
              data-testid="checkout-fullname"
              required
            />
          </label>
          <label className="checkout-inputs" htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              data-testid="checkout-email"
              required
            />
          </label>
          <label className="checkout-inputs" htmlFor="cpf">
            CPF:
            <input id="cpf" type="number" data-testid="checkout-cpf" required />
          </label>
          <label className="checkout-inputs" htmlFor="phone">
            Telefone:
            <input
              id="phone"
              type="number"
              data-testid="checkout-phone"
              required
            />
          </label>
          <label className="checkout-inputs" htmlFor="cep">
            CEP:
            <input id="cep" type="number" data-testid="checkout-cep" required />
          </label>
          <label className="checkout-inputs" htmlFor="address">
            Endereço:
            <input
              id="address"
              type="text"
              data-testid="checkout-address"
              required
            />
          </label>
          <button type="submit">Finalizar</button>
        </form>
        {finish && <Redirect to="/online-store" />}
      </section>
    );
  }
}

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  finish: PropTypes.func.isRequired,
};
