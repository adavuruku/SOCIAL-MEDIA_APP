import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
));

//this define all the props for
// this component. 
// so PropTypes.array.isRequired means the props
//must be set and must be an array in other to use this components
Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

//mapStateToProps of redux is use to add redux
//store value to the props of the component
//the code bellow add alert to the props of this
//component - i.e it define how the component is
//connected to the redux store thats the data
//we need from the store
const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);