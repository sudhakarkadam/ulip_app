import React from "react";
import { connect, ConnectedProps } from "react-redux";
import ActionCreators from "../actions/ActionCreators";
import { FlexRow } from "./@styled/BaseElements";
import StyledButton from "./@styled/StyledButton/StyledButton";

const { setUserPersona } = ActionCreators;
const mapDispatchToProps = { setUserPersona };
const connector = connect(null, mapDispatchToProps);

type UserPerosnaProps = ConnectedProps<typeof connector>;

const perosnaList = [
  {
    name: "You are driver",
    value: "DRIVER"
  },
  {
    name: "You are Shipper",
    value: "SHIPPER"
  },
  {
    name: "You are LSP",
    value: "LSP"
  }
];

const UserPerosna = (props: UserPerosnaProps) => {
  return (
    <>
      {perosnaList.map((persona, idx) => {
        return (
          <FlexRow key={idx}>
            <StyledButton
              height="40"
              title={persona.name}
              onPress={() => props.setUserPersona({ user: persona.value })}
            />
          </FlexRow>
        );
      })}
    </>
  );
};

export default connector(UserPerosna);
