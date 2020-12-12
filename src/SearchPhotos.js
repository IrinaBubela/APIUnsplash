import React from "react";
import Unsplash, { toJson } from "unsplash-js";
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import SelectedPhoto from './SelectedPhoto';

const API_URL = "https://api.unsplash.com/search/photos?per_page=24&query="
const KEY = process.env.REACT_APP_NOT_SECRET_CODE;

const unsplash = new Unsplash({
    accessKey: KEY
});


export default class SearchPhotos extends React.Component {

    constructor() {
        super();

        this.state = {
            query: '',
            value: '',
            pics: '',
            suggestions: [],
            suggestionSelected: ''
        };
    }
    // Filter logic
    getSuggestions = async (value) => {
        const inputValue = value.trim().toLowerCase();
        let response = await axios.get(`${API_URL}?page=1`,
            {
                params: { query: inputValue },
                headers: {
                    Authorization: `Client-ID ${KEY}`
                }
            })
        let data = response.data;
        return data;
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
        event.preventDefault();
        if (method === 'click') {
            this.setState({
                query: suggestion.alt_description
            })
        }

        this.searchPhotos();
    }

    // Trigger suggestions
    getSuggestionValue = suggestion => suggestion.alt_description;

    // Render Each Option
    renderSuggestion = suggestion => (
        <span className="sugg-option">
            {suggestion.alt_description}
        </span>
    );

    // OnChange event handler
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
            query: newValue
        });
    };

    // Suggestion rerender when user types
    onSuggestionsFetchRequested = ({ value }) => {
        if (value.length > 2) {
            this.getSuggestions(value)
                .then(data => {
                    this.setState({
                        suggestions: data.results
                    });
                })
                .catch(err =>
                    console.log(err)
                )
        }
    };

    // Triggered on clear
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.searchPhotos();
    }

    searchPhotos = async () => {
        unsplash.search
            .photos(this.state.query, 1, 20)
            .then(toJson)
            .then((json) => {
                this.setState({
                    pics: json.results,
                    value: ''
                })
            })
    };

    render() {
        const { value, suggestions } = this.state;

        // Option props
        const inputProps = {
            placeholder: 'Search photo ...',
            value,
            onChange: this.onChange
        };

        let pictures;
        if (this.state.pics) {
            pictures = this.state.pics.map((el, i) =>
                <SelectedPhoto pic={el} key={i} />
            )
        }
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <label className="label" htmlFor="query">
                        {" "}
                    </label>

                    <Autosuggest
                        className="input-suggest"
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        onSuggestionSelected={this.onSuggestionSelected}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                    />
                    <button type="submit" className="button">
                        Search
                    </button>
                </form>
                <div className="card-list">
                    {pictures}
                </div>
            </div>
        );
    }
}