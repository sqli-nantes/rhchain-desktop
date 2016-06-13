import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Administrator from '../components/Administrator';
import * as AdministratorActions from '../actions/administrator';
import * as HomeActions from '../actions/home';

function mapStateToProps(state) {
  return {
    administrator: state.administrator,
    home: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},AdministratorActions,HomeActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Administrator);
