import React from 'react';
import { host, lettersToLook, port, searchEndpoint } from '../constants';
import SearchResult from './searchResult';

class Menu extends React.Component {
    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            searchWord: '',
            foundProducts: [],
        };

        this.showSearchContainer = this.showSearchContainer.bind(this);
        this.handleEscapeKey = this.handleEscapeKey.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.findWords = this.debounce(this.findWords, 500);
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch,
            searchWord: '',
            foundProducts: [],
        });
    }

    /**
     * Return a function with debounce implemented
     * @memberof Menu
     * @param cb [Function] - the callback function that will be debounced.
     * @param delay [Number] - the amount of milliseconds in which the debounce will be executed.
     */
    debounce(cb, delay) {
        let timer = null;
        return function (...args) {
            const context = this;

            clearTimeout(timer);
            timer = setTimeout(() => {
                cb.apply(context, args);
            }, delay);
        };
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        const { value } = e.target;
        this.setState({ searchWord: value });

        value.length > lettersToLook
            ? this.findWords(value)
            : this.setState({ foundProducts: [] });
    }

    /**
     * Calls when press escape on search
     * @memberof Menu
     * @param {*} event
     */
    handleEscapeKey(event) {
        if (event.keyCode === 27) {
            this.setState({
                showingSearch: false,
            });
        }
    }

    /**
     * Calls when click outside the search bar
     * @memberof Menu
     * @param {*} event
     */
    handleOutsideClick(event) {
        if (
            !document.getElementById('search-container').contains(event.target)
        ) {
            this.setState({
                showingSearch: false,
            });
        }
    }

    /**
     * Fetch search endpoint to look for relevant products.
     * @memberof Menu
     */
    findWords(word) {
        fetch(`http://${host}:${port}/${searchEndpoint}/${word}`)
            .then((response) => response.json())
            .then((products) => {
                this.setState({ foundProducts: products });
            })
            .catch((e) => this.setState({ foundProducts: [] }));
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleEscapeKey);
        document.addEventListener('keydown', this.handleEscapeKey);

        document.addEventListener('mousedown', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEscapeKey);
        document.removeEventListener('keydown', this.handleEscapeKey);

        document.removeEventListener('mousedown', this.handleOutsideClick);
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     *
     * @returns JSX
     * @memberof App
     */
    render() {
        const { foundProducts, searchWord, showingSearch } = this.state;

        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">
                                HOLIDAY
                            </a>
                            <a href="#" className="nav-item">
                                WHAT'S NEW
                            </a>
                            <a href="#" className="nav-item">
                                PRODUCTS
                            </a>
                            <a href="#" className="nav-item">
                                BESTSELLERS
                            </a>
                            <a href="#" className="nav-item">
                                GOODBYES
                            </a>
                            <a href="#" className="nav-item">
                                STORES
                            </a>
                            <a href="#" className="nav-item">
                                INSPIRATION
                            </a>

                            <a
                                href="#"
                                onClick={(e) => this.showSearchContainer(e)}
                            >
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div
                    id="search-container"
                    className={
                        (showingSearch ? 'showing ' : '') + 'search-container'
                    }
                >
                    <input
                        type="text"
                        value={searchWord}
                        onChange={(e) => this.onSearch(e)}
                    />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    <SearchResult foundProducts={foundProducts} />
                </div>
            </header>
        );
    }
}

module.exports = Menu;
