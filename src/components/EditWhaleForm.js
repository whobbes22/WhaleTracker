// import React from "react";
// import ReusableForm from "./ReusableForm";
// import PropTypes from "prop-types";

// function EditWhaleForm(props) {
//   const { whale } = props;

//   function handleEditWhaleFormSubmission(event){
//     event.preventDefault();
//     props.onEditWhale({species: event.target.species.value, location: event.target.location.value, date: event.target.date.value, id: whale.id});
//   }

//   return (
//     <React.Fragment>
//       <ReusableForm
//         formSubmissionHandler={handleEditWhaleFormSubmission}
//         buttonText="Update Whale" />
//     </React.Fragment>
//   );
// }

// EditWhaleForm.propTypes = {
//   whale: PropTypes.object,
//   onEditWhale: PropTypes.func
// };

// export default EditWhaleForm;