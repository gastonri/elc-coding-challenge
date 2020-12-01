import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NoResults from './noResults';
import SearchItemProduct from './searchItemProduct';

class SearchResult extends Component {
    /**
     * Main constructor for the SearchResult Class
     * @memberof SearchResult
     */
    constructor(props) {
        super(props);
    }

    /**
     * Render found products.
     * @memberof SearchResult
     */
    renderProductsResults() {
        const { foundProducts } = this.props;

        return foundProducts.map((product) => {
            const { about, picture, id, price, name } = product;

            const searchItemProps = {
                description: about,
                image: picture,
                key: id,
                price: price,
                title: name,
            };

            return <SearchItemProduct {...searchItemProps} />;
        });
    }

    render() {
        const { foundProducts } = this.props;

        return (
            <div className="search-results">
                {foundProducts.length ? (
                    this.renderProductsResults()
                ) : (
                    <NoResults />
                )}
            </div>
        );
    }
}

module.exports = SearchResult;

SearchResult.propTypes = {
    foundProducts: PropTypes.arrayOf(
        PropTypes.shape({
            about: PropTypes.string,
            id: PropTypes.string,
            picture: PropTypes.string,
            price: PropTypes.string,
            title: PropTypes.string,
        })
    ),
};
