import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Administrator from '../components/Administrator';
import * as AdministratorActions from '../actions/administrator';
import * as AppActions from '../actions/app';

function mapStateToProps(state) {
  return {
    over: state.administrator.over
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},AdministratorActions,AppActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Administrator);
