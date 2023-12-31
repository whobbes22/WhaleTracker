import React from 'react';
import WhaleList from './WhaleList';
import NewWhaleForm from "./NewWhaleForm";
import WhaleDetail from './WhaleDetail';
import EditWhaleForm from './EditWhaleForm';
import WhaleCounter from './WhaleCounter';

class WhaleControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainWhaleList: [],
      selectedWhale: null,
      editing: false,
      eventCounter: 0 // <- whale counter
    };
  }

  handleChangingSelectedWhale = (id) => {
    const selectWhale = this.state.mainWhaleList.filter(whale => whale.id === id)[0];
    this.setState({selectedWhale: selectWhale});
  }

  handleClick = () => {
    if(this.state.selectedWhale != null){
      this.setState({
        formVisibleOnPage: false,
        selectedWhale: null,
        editing: false
      });
    }else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  handleDeletingWhale = (id) => {
    const selectWhale = this.state.mainWhaleList.filter(whale => whale.id !== id);
    this.setState({
      mainWhaleList: selectWhale,
      selectedWhale: null,
      eventCounter: this.state.eventCounter -1
    });
  }

  handleEditingWhaleInList = (whaleToEdit) => {
    const editedMainWhaleList = this.state.mainWhaleList
      .filter(whale => whale.id !== this.state.selectedWhale.id)
      .concat(whaleToEdit);
    this.setState({
      mainWhaleList: editedMainWhaleList,
      editing: false,
      selectedWhale: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  // handleAddNewWhaleToList = (newWhale) => {
  //   const newWhaleList = this.state.mainWhaleList.concat(newWhale);
  //   this.setState({mainWhaleList: newWhaleList,
  //   formVisibleOnPage: false});
  // }

  handleAddNewWhaleToList = (newWhale) => {
    const updatedWhale = {
      ...newWhale,
      event: this.state.eventCounter + 1,
    };
    const newWhaleList = this.state.mainWhaleList.concat(updatedWhale);
    this.setState({mainWhaleList: newWhaleList,
    formVisibleOnPage: false,
    eventCounter: this.state.eventCounter + 1});
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    let whaleCounterText = null;
    
    //let whaleCounterText = <WhaleCounter amountOfWhales = {this.state.eventCounter}/>

    if(this.state.editing){
      currentlyVisibleState = <EditWhaleForm whale = {this.state.selectedWhale} onEditWhale = {this.handleEditingWhaleInList} counter={this.state.eventCounter}/>
      buttonText = "Return to Whale List";
    } else if(this.state.selectedWhale != null){
      currentlyVisibleState = <WhaleDetail whale={this.state.selectedWhale} onClickingDelete = {this.handleDeletingWhale} onClickingEdit ={this.handleEditClick} />
      buttonText = "Return to Whale List";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewWhaleForm onNewWhaleCreation={this.handleAddNewWhaleToList} />;
      buttonText = "Return to Whale List";
    } else {
      currentlyVisibleState = <WhaleList whaleList={this.state.mainWhaleList} onWhaleSelection={this.handleChangingSelectedWhale} />;
      buttonText = "Add Whale";
    }
    return (
      <React.Fragment>
        {whaleCounterText}
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default WhaleControl;

