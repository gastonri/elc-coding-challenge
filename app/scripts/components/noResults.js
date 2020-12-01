import React, { Component } from 'react';
import { noResultsText } from '../constants';

class NoResults extends Component {
    render() {
        return <div className="no-results">{noResultsText}</div>;
    }
}

module.exports = NoResults;
