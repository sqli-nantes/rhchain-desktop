import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Collaborator from '../components/Collaborator';
import * as CollaboratorActions from '../actions/collaborator';
import * as AppActions from '../actions/app';

function mapStateToProps(state) {
  return {
    collaborator: state.collaborator,
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},CollaboratorActions,AppActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Collaborator);
