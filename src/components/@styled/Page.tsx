import { Flex1 } from "./Flex";
import React from "react";

export const Page: React.FC<{ bg?: string }> = props => (
  <Flex1 bg={props.bg || "bg"}>{props.children}</Flex1>
);

export const PageContent: React.FC = props => (
  <Flex1
    bg="white"
    border="1px solid white"
    style={{
      elevation: 8,
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      overflow: "hidden"
    }}
    mt={5}
  >
    {props.children}
  </Flex1>
);
