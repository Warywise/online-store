import React, { Component } from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import InitialMsg from "./components/InitialMsg";
import CartItems from "./pages/CartItems";
import CategoriesBar from "./components/CategoriesBar";
import {
  getCategories,
  getProductsByCategory,
  getProductsByQuery,
} from "./services/api";
import ListProducts from "./components/ListProducts";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import Loading from "./components/Loading";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      categoriesBar: [],
      isLoading: false,
      searched: false,
      searchResults: [],
      getProducts: [],
      allEvaluation: [],
    };
  }

  componentDidMount() {
    getCategories().then((items) =>
      this.setState({
        categoriesBar: items,
        loaded: true,
      })
    );
    this.loadLocalStorage();
  }

  handleClick = (objectItem, decrease) => {
    const {
      title,
      thumbnail,
      id,
      price,
      available_quantity: available,
    } = objectItem;
    const { getProducts } = this.state;
    let newItem;
    let newState;

    if (getProducts.some((product) => product.id === id)) {
      let index;
      const product = getProducts.filter((prod, ind) => {
        if (prod.id === id) index = ind;
        return prod.id === id;
      })[0];
      const quantity = decrease ? product.quantity - 1 : product.quantity + 1;
      if (quantity > available) return;
      newState = [...getProducts];
      newState.splice(index, 1, {
        thumbnail,
        id,
        title,
        price,
        quantity,
        available_quantity: available,
      });
    } else {
      newItem = {
        thumbnail,
        id,
        title,
        price,
        quantity: 1,
        available_quantity: available,
      };
      newState = [...getProducts, newItem];
    }

    this.setState(
      {
        getProducts: newState,
      },
      () => {
        localStorage.setItem("getProducts", JSON.stringify(newState));
      }
    );
  };

  removeItemCart = (valueId) => {
    const itemsStorage = JSON.parse(localStorage.getItem("getProducts"));
    const itemsAtt = itemsStorage.filter(({ id }) => valueId !== id);
    localStorage.setItem("getProducts", JSON.stringify(itemsAtt));
    this.loadLocalStorage();
  };

  filterCategory = (category) => {
    this.setState({ searched: false, isLoading: true });
    getProductsByCategory(category).then(({ products }) => {
      return this.setState({
        searched: true,
        isLoading: false,
        searchResults: products,
      });
    });
  };

  searchItems = (query) => {
    this.setState({ searched: false, isLoading: true });
    getProductsByQuery(query).then(({ products }) =>
      this.setState({
        searched: true,
        isLoading: false,
        searchResults: products,
      })
    );
  };

  saveEvaluation = (id, valueForm) => {
    const { allEvaluation } = this.state;
    const { name, evaluation, comment } = valueForm;
    const evalProduct = allEvaluation.filter((elemnt) => elemnt.id === id);

    if (evalProduct.length >= 1) {
      const array = evalProduct[0].comments;
      array.push({ name, evaluation, comment });
      const newEvaluation = { id, comments: array };
      const atualizaState = allEvaluation.filter((elemnt) => elemnt.id !== id);
      atualizaState.push(newEvaluation);
      this.setState({ allEvaluation: atualizaState }, () => {
        localStorage.setItem(
          "evaluationStorage",
          JSON.stringify(allEvaluation)
        );
      });
    } else {
      const newEvaluation = { id, comments: [{ name, evaluation, comment }] };
      allEvaluation.push(newEvaluation);
      this.setState({ allEvaluation }, () => {
        localStorage.setItem(
          "evaluationStorage",
          JSON.stringify(allEvaluation)
        );
      });
    }
  };

  loadLocalStorage() {
    if (localStorage.getItem("getProducts")) {
      this.setState({
        getProducts: JSON.parse(localStorage.getItem("getProducts")),
      });
    }

    if (localStorage.getItem("evaluationStorage")) {
      this.setState({
        allEvaluation: JSON.parse(localStorage.getItem("evaluationStorage")),
      });
    }
  }

  finishShop = () => {
    this.setState({ getProducts: [] });
    localStorage.removeItem("getProducts");
  };

  render() {
    const {
      categoriesBar,
      loaded,
      searched,
      isLoading,
      searchResults,
      getProducts,
      allEvaluation,
    } = this.state;

    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/online-store"
              render={() => (
                <>
                  <Header items={getProducts} />
                  <div className="categories-div">
                    {loaded && (
                      <CategoriesBar
                        items={categoriesBar}
                        callback={this.filterCategory}
                      />
                    )}
                  </div>
                  <div className="main-div">
                    <nav>
                      <InitialMsg
                        callback={this.searchItems}
                        condition={searched}
                      />
                    </nav>
                    {isLoading && <Loading />}
                    {searched && (
                      <ListProducts
                        callback={this.handleClick}
                        searchResults={searchResults}
                      />
                    )}
                  </div>
                </>
              )}
            />
            <Route path="/online-store/cart-items">
              <Header items={getProducts} />
              <CartItems
                itemsAdd={getProducts}
                callback={this.handleClick}
                removeItemCart={this.removeItemCart}
              />
            </Route>
            <Route
              path="/online-store/product/:categoryId/:id"
              render={(props) => (
                <>
                  <Header items={getProducts} />
                  <div className="categories-div">
                    {loaded && (
                      <CategoriesBar
                        items={categoriesBar}
                        callback={this.searchItems}
                      />
                    )}
                  </div>
                  <div className="main-div">
                    <nav>
                      <InitialMsg
                        callback={this.searchItems}
                        condition={searched}
                      />
                    </nav>
                    <Product
                      {...props}
                      callback={this.handleClick}
                      submitForm={this.saveEvaluation}
                      allEvaluation={allEvaluation}
                      items={getProducts}
                    />
                  </div>
                </>
              )}
            />
            <Route path="/online-store/checkout">
              <Header items={getProducts} />
              <Checkout cartItems={getProducts} finish={this.finishShop} />
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
