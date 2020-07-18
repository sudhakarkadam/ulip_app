import React from "react";
import { connect, ConnectedProps } from "react-redux";
import ActionCreators from "../actions/ActionCreators";
import ChoosePersona from "./ChoosePersona";

const { setUserPersona } = ActionCreators;
const mapDispatchToProps = { setUserPersona };
const connector = connect(null, mapDispatchToProps);

type UserPerosnaProps = ConnectedProps<typeof connector>;

const UserPerosna = (props: UserPerosnaProps) => {
  return (
    <>
      <ChoosePersona
        selectedUser={(user: string) => props.setUserPersona({ user })}
      />
    </>
  );
};

export default connector(UserPerosna);
