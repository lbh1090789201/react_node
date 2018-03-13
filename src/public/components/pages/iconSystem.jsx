import { connect } from 'react-redux';
import BottomNav from './bottomNav';

class IconSystem extends React.Component{
    constructor() {
      super();
    }
    render() {
      return (
        <div>
          这是图表系统
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
)(IconSystem)
