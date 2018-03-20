import { connect } from 'react-redux';
import { ajaxRequest } from "../../actions/ajaxReducer";

class UserLogin extends React.Component{
  constructor() {
    super();
    this.state = {
      time: "",
      consuming: "",
      price: ""
    }
  }
  render() {
    return (
      <div id="login_userLogin">
        用户登录
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLogin);
