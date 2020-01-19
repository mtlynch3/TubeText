import React, { Component } from 'react';
import SingleSessionView from '../views/SingleSessionView';
import { connect } from 'react-redux';
import { fetchNotesThunk, addNotesThunk } from '../../store/actions/actionCreatorsThunks';

class SingleSessionContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            studySessionId: 0,
            videoTimestamp: 0,
            noteRecord: ""
        }
    }

    handleChange=(event)=>{
        console.log("I am changing input", [event.target.name], event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    //constructor here
    //hold state for fields here 

    //make handleSubmit function
    //take the state and pass it to the thunk in this function

    handleSubmit=(event)=>{
        event.preventDefault();
        let note = {
            studySessionId: this.state.id,
            videoTimestamp: this.state.timeStamp,
            noteRecord: this.state.noteRecord
        }
        console.log("I am handling submit: ", note)
        this.props.addNotesThunk(note);
    }


    componentDidMount(){
        console.log("I am mounted");
        this.props.fetchNotesThunk();
    }
    render() {
        return(
            <SingleSessionView allNotes = {this.props.allNotes} 
            // addNotesThunk = {this.props.addNotesThunk} 
            handleChange = {this.props.handleChange} 
            handleSubmit={this.props.handleSubmit}/>
        )
    }
}

const mapState = (state) => {
    console.log("I am in state");
    return({
        allNotes: state.allNotes
    })
}

const mapDispatch = (dispatch) => {
    console.log("I am in dipsathc");
    return({
        fetchNotesThunk: () => dispatch(fetchNotesThunk()),
        addNotesThunk: (note) => dispatch(addNotesThunk(note))
    })
}

export default connect(mapState, mapDispatch)(SingleSessionContainer);