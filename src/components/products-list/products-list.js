import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import Loading from 'react-loading-animation';
import FlipMove from 'react-flip-move';

import { getProducts } from '../../actions';
import './products-list.css';

class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.addVote = this.addVote.bind(this);
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
  }

  addVote(id){
    const { products } = this.props;
    var item = products.findIndex(x => x.id === id);
    products[item].votes = products[item].votes + 1;
    products.sort((a, b) => (a.votes < b.votes) ? 1 : -1);
    this.setState({products})
  }

  prodList() {
    const { products } = this.props;
    return (
     <FlipMove>
       {products.map(product =>(
        <div key={product.id} className="row product">
          <div className="col-md-3 col-sm-3 col-xs-3 left top">
            <img
              alt="product"
              className="product-img"
              src={product.productImageUrl}
            />
          </div>
          <div style={{marginTop:'-5px'}} className="col-md-9 col-sm-9 col-xs-9 left">
            <div className="vote">
              <img alt="vote" className="vote-icon" src={'images/ui/arrow.png'} 
                   onClick={() => this.addVote(product.id)} />
              <span>{product.votes}</span>
            </div>
            <div className="product-title">
              <a href={product.url}>{product.title}</a>
            </div>
            <div className="product-desc">{product.description}</div>
            <div className="user">Submitted by: 
              <img alt="vote" className="user-img" src={product.submitterAvatarUrl}/>
            </div>
          </div>
        </div>))}
      </FlipMove>
    );
  }

  render() {
    const { pending } = this.props;
    return (
      <div className="products-component">
        <header className="products-header">
          Popular Products
        </header>
        {pending && <div className="loader"><Loading/></div>}
        <div className="products-list">{this.prodList()}></div>
      </div>
    );
  }
}

ProductsList.propTypes = {
  fetchProducts: func.isRequired
};

export const mapStateToProps = ({ products: { products, pending } }) => ({
  products,
  pending
});

export const mapDispatchToProps = {
  fetchProducts: getProducts.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductsList);