import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Collaborator from '../components/Collaborator';

import * as CollaboratorActions from '../actions/collaborator';
import * as HomeActions from '../actions/home';

function mapStateToProps(state) {
  return {
    collaborator: state.collaborator,
    home: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},CollaboratorActions,HomeActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Collaborator);
