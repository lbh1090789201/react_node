import { connect } from 'react-redux';
import BottomNav from './bottomNav';

class MiscellStores extends React.Component{
    constructor() {
      super();
    }
    render() {
      return (
        <div>
          这是杂店
          <BottomNav />
        </div>
      )
    }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiscellStores)
