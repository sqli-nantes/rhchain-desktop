import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Collaborator from '../components/Collaborator';
import * as CollaboratorActions from '../actions/collaborator';

function mapStateToProps(state) {
  return {
    collaborator: state.collaborator,
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CollaboratorActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Collaborator);
