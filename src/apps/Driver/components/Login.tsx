import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import ShipperActionCreators from "../actions/DriverActionCreators";
import { ShipperAppState } from "../reducers";

const { login } = ShipperActionCreators;
const mapStateToProps = (state: ShipperAppState) => ({
  userInfo: state.user.userInfo
});
const mapDispatchToProps = { login };
const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

type Props = ConnectedProps<typeof connector>;

const Login = (props: Props) => {
  useEffect(() => {
    props.login({});
  }, []);
  return (
    <View style={{ margin: 10 }}>
      <Text>Login</Text>
    </View>
  );
};

export default connector(Login);
