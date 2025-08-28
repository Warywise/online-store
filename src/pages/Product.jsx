import React from "react";
import PropTypes from "prop-types";
import "../styles/ProductDetails.css";
import { Link } from "react-router-dom";
import { getProductsById } from "../services/api";
import ButtonAddCart from "../components/ButtonAddCart";
import EvaluationProduct from "../components/EvaluationProduct";
import Loading from "../components/Loading";
import EvalStars from "../components/EvaluationStars";

class Product extends React.Component {
  constructor() {
    super();

    this.fethProduct = this.fethProduct.bind(this);
    this.state = {
      prodDetails: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.fethProduct();
  }

  async fethProduct() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const result = await getProductsById(id);
    this.setState(
      {
        prodDetails: result,
      },
      () => this.setState({ loading: true })
    );
  }

  render() {
    const { prodDetails, loading } = this.state;
    const { callback, submitForm, allEvaluation } = this.props;
    const {
      match: {
        params: { id },
      },
    } = this.props;

    let evaluations = [];
    if (allEvaluation.length >= 1) {
      evaluations = allEvaluation.filter((elem) => elem.id === id);
    }
    if (loading && !prodDetails) {
      return (
        <div>
          Desculpe. Não foi possível encontrar os detalhes deste produto.
        </div>
      );
    }

    return loading ? (
      <section className="product-details">
        <Link className="back-details" to="/online-store">
          ↶
        </Link>
        <div className="details-div-content">
          <h1 data-testid="product-detail-name">
            {prodDetails.title}
            {" - "}
            {Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(prodDetails.price)}
          </h1>
        </div>
        <div className="details-div-content">
          <div className="product-info-details">
            <div>
              {prodDetails.brand && (
                <>
                  <h3>Marca:</h3>
                  <span>{prodDetails.brand}</span>
                </>
              )}

              {prodDetails.category && (
                <>
                  <h3>Categoria:</h3>
                  <span>{prodDetails.category}</span>
                </>
              )}

              <h3>Tags:</h3>
              <ul style={{ marginBlock: 0 }}>
                {prodDetails.tags?.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {Number(prodDetails.rating) > 4 && (
                <h4 data-testid="free-shipping">
                  <code>Satisfação Garantida!</code>
                </h4>
              )}
              <ButtonAddCart
                dataTestid="product-detail-add-to-cart"
                productDetails={prodDetails}
                callback={callback}
              />
            </div>
            <img src={prodDetails.thumbnail} alt={prodDetails.title} />
          </div>
        </div>
        <div className="details-div-content">
          <h3>Avaliações</h3>
          {prodDetails.reviews.length > 0 ? (
            [...prodDetails.reviews, ...(evaluations[0]?.comments || [])].map(
              ({ evaluation, rating, comment, reviewerName, name }, ind) => (
                <div
                  key={`${ind}${reviewerName || name}`}
                  className="eval-coments"
                >
                  <h4>{reviewerName || name}</h4>
                  <p>{comment}</p>
                  <EvalStars evaluation={rating || evaluation} />
                </div>
              )
            )
          ) : (
            <div className="eval-coments">
              Ainda não há avaliações para este item. Seja o primeiro!
            </div>
          )}
          <EvaluationProduct id={id} submitForm={submitForm} />
        </div>
      </section>
    ) : (
      <Loading />
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      categoryId: PropTypes.string,
    }),
  }).isRequired,
  callback: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  allEvaluation: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Product;
