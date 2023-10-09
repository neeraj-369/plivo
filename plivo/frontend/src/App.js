import React, { Component } from 'react';
import logo from './sample.png';
import './App.css';
import ChatDashboard from "./ChatDashboard";
import earth from './earth.png';
import pol from './pol.png';
import temp from './temp.png';
import stock from './stock.png';

function getImageForAttribute(attribute) {
    switch (attribute) {
        case "earthquake":
            return earth;
        case "pollution":
            return pol;
        case "temperature":
            return temp;
        case "stock":
            return stock;
        default:
            return "./default.png"; // Provide a default image if needed
    }
}

class App extends Component {
    state = {
        messages: [],
        users: [{ username: 'You' }],
        showSpecialForm: false,
        dataObject: {
            attribute: '',
            location: '', // Added location for Earthquake, Pollution, and Temperature
            stock: '', // Added stock for Stocks
            inputValue: '',
        },
        phoneNumbers: [],
        submitted: false,
        dataObjectsArray: [], // Array to store the created data objects
    };

    updateMessageListing = (message) => {
        let update_messages_list = this.state.messages.slice();
        update_messages_list.push(message);

        this.setState({
            messages: update_messages_list,
        });
    };

    toggleSpecialForm = () => {
        this.setState({ showSpecialForm: !this.state.showSpecialForm, submitted: false });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const attribute = event.target.attribute.value;
        const inputValue = event.target.inputValue.value;
        const location = event.target.location ? event.target.location.value : ''; // Added location for Earthquake, Pollution, and Temperature
        const stock = event.target.stock ? event.target.stock.value : ''; // Added stock for Stocks

        const newDataObject = {
            attribute,
            location, // Added location for Earthquake, Pollution, and Temperature
            stock, // Added stock for Stocks
            inputValue,
            phoneNumbers: this.state.phoneNumbers,
        };

        const newDataObjectsArray = [...this.state.dataObjectsArray, newDataObject];

        this.setState(
            {
                dataObjectsArray: newDataObjectsArray,
                showSpecialForm: false,
                submitted: true,
                phoneNumbers: [],
            },
            () => {
                this.sendDataToBackend(newDataObject);
            }
        );
    };

    sendDataToBackend = (dataObject) => {
        console.log('Sending data to backend:', dataObject);
    };

    addPhoneNumber = () => {
        const phoneNumber = prompt('Enter a phone number:');
        if (phoneNumber) {
            this.setState({ phoneNumbers: [...this.state.phoneNumbers, phoneNumber] });
        }
    };

    renderSpecialForm() {
        const { attribute } = this.state.dataObject;

        if (attribute === 'earthquake' || attribute === 'pollution' || attribute === 'temperature') {
            return (
                <>
                    <label>
                        Select Location:
                        <select name="location">
                            <option value="Mumbai">Mumbai</option>
                            <option value="Hyderabad">Hyderabad</option>
                        </select>
                    </label>
                </>
            );
        } else if (attribute === 'stock') {
            return (
                <>
                    <label>
                        Select Stock:
                        <select name="stock">
                            <option value="Apple">Apple</option>
                            <option value="Tesla">Tesla</option>
                        </select>
                    </label>
                </>
            );
        } else {
            return null;
        }
    }
    

    render() {
        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <img
                            src={logo}
                            className="App-logo"
                            alt="logo"
                            style={{ borderRadius: '20%', maxWidth: '200px', maxHeight: '200px' }}
                        />
                        <br></br>
                        <br></br>
                        <h1 className="App-title">AlertCrafter</h1>
                    </header>

                    <div className="container">
                        {this.state.users.map((user) => (
                            <ChatDashboard
                                key={user.username}
                                user={user}
                                updateMessages={this.updateMessageListing}
                                messages={this.state.messages}
                            />
                        ))}
                    </div>
                    <br></br>

                    <button onClick={this.toggleSpecialForm}>ADD NOTIFY</button>
                    {this.state.submitted ? (
                        <></>
                    ) : (
                        <div>
                            {this.state.showSpecialForm && (
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        Select an attribute:
                                        <select name="attribute" onChange={(e) => this.setState({ dataObject: { ...this.state.dataObject, attribute: e.target.value } })}>
                                            <option value="earthquake">Earthquake</option>
                                            <option value="temperature">Temperature</option>
                                            <option value="pollution">Pollution</option>
                                            <option value="stock">Stock</option>
                                        </select>
                                    </label>
                                    <br />
                                    {this.renderSpecialForm()}
                                    <br />
                                    <label>
                                        Threshold Value:
                                        <input type="text" name="inputValue" />
                                    </label>
                                    <br />
                                    <button type="button" onClick={this.addPhoneNumber}>Add Phone Number</button>
                                    <ul>
                                        {this.state.phoneNumbers.map((phoneNumber, index) => (
                                            <li key={index}>{phoneNumber}</li>
                                        ))}
                                    </ul>
                                    <br />
                                    <button type="submit">Submit</button>
                                </form>
                            )}
                        </div>
                    )}
                    <div>
                        {/* <h2>Submitted Data:</h2> */}
                        <div className="page-container">
                            <div className="content-container">
                                {this.state.dataObjectsArray.map((dataObject, index) => (
                                    <div key={index} className="data-item">
                                        <div className="image-container">
                                            <img src={getImageForAttribute(dataObject.attribute)} alt="Product" />
                                        </div>
                                        <div className="details-container">
                                            <p>Attribute: {dataObject.attribute}</p>
                                            {dataObject.location && <p>Location: {dataObject.location}</p>}
                                            {dataObject.stock && <p>Stock: {dataObject.stock}</p>}
                                            <p>Threshold Value: {dataObject.inputValue}</p>
                                            <p>Phone Numbers: {dataObject.phoneNumbers.join(', ')}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default App;
