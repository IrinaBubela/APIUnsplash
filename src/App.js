import React from "react";
import "./App.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchPhotos from "./SearchPhotos";

function App() {
    return (
        <div className="App">
            <div className="container">
                <SearchPhotos />
            </div>
        </div>
    );
}
export default App;