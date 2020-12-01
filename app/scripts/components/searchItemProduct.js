import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchItemProduct extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { image, title, description, price } = this.props;

        return (
            <div className="search-item-product">
                <img className="product-image" src={image} />
                <div className="info-wrapper">
                    <span className="product-title">{title}</span>
                    <span className="product-description">
                        {description}
                    </span>
                    <span className="product-price">{price ? `$ ${price}` : '---'}</span>
                </div>
            </div>
        );
    }
}

module.exports = SearchItemProduct;

SearchItemProduct.propTypes = {
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string,
    title: PropTypes.string.isRequired,
};
