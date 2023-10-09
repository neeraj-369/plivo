import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import PhoneIcon from '@mui/icons-material/Phone';

class CreateMessage extends Component {
    hrStyle = {
        borderColor: '#FF0000', // Red color (you can change this to any color you prefer)
        borderWidth: '2px',     // Optional: Set the border width
    };
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',       // Input field for adding new numbers
            phoneNumbers: [+918074403180],      // Array to store added phone numbers
            messages: [],
            users: [{ username: 'You' }],
        };
    }

    // Event handler for input change
    handleInputChange1 = (event) => {
        this.setState({ phoneNumber: event.target.value });
    }

    // Event handler for form submission
    handleSubmit1 = (event) => {
        event.preventDefault();
        const { phoneNumber, phoneNumbers } = this.state;

        if (phoneNumber.trim() !== "") {
            // Add the new phone number to the array of phone numbers
            this.setState({
                phoneNumbers: [...phoneNumbers, phoneNumber],
                phoneNumber: '', // Clear the input field
            });
        }
    }
    state = {
        message: '',
    };

    isDisabled = () => {
        return this.state.message === '';
    };

    handleInputChange = (event) => {
        let value = event.target.value;
        this.setState({
            message: value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createMessage(this.state.message);

        const { phoneNumbers, message } = this.state;
        const destinationNumbers = phoneNumbers.join('<');

        console.log(destinationNumbers)
        const data = {
            from_number: '919398152092',
            destination_number: destinationNumbers,
            message: this.state.message,
        };
        axios.post('http://localhost:5000/send_message', data)
            .then(response => {
                console.log('Message sent successfully');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    handle = (event) => {
        event.preventDefault();
        const { phoneNumbers, message } = this.state;
        const destinationNumbers = phoneNumbers.join('<');
        const data = {
            from_number: '+919398152092',
            to_number: destinationNumbers,
        };
        axios.post('http://localhost:5000/send_call', data)
            .then(response => {
                console.log('Call sent successfully');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };
    

    render() {
        const { phoneNumber, phoneNumbers } = this.state;
        return (

            <div>
                
                <form className="input-group" onSubmit={this.handleSubmit}>
                    <input type="text"
                           className="form-control"
                           onChange={this.handleInputChange}
                           value={this.state.message}
                           placeholder="Enter your message..."
                    />
                    <div className="input-group-append">
                        <button
                            className="btn submit-button"
                            disabled={this.isDisabled()}
                        >
                            SEND
                        </button>
                    </div>
                </form>
                <br></br>
                <button onClick={this.handle} className="btn submit-button-1">CALL</button>
                <hr className="colored-line" />
                <div>
                <form className="input-group" onSubmit={this.handleSubmit1}>
                    <input placeholder="Add a Number..." className="form-control" type="text" value={phoneNumber} onChange={this.handleInputChange1} />
                    {/* <br /> */}
                    <div className="input-group-append">
                        <button
                            className="btn submit-button-1"
                            disabled={this.isDisabled()}
                        >
                           ADD  
                        </button>
                    </div>
                    {/* <button disabled={this.isDisabled()}className="btn submit-button-1">ADD NUMBERS</button> */}
                </form>
                <ul className="phone-number-list" >
                    {phoneNumbers.map((number, index) => (
                        <li key={index}>{number}</li>
                    ))}
                </ul>
            </div>
            </div>
        );
    }
}

CreateMessage.propTypes = {
    createMessage: PropTypes.func.isRequired,
};

export default CreateMessage;
