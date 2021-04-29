import React, { useState } from "react";

import { Box } from "./@styled/BaseElements";
export const StickyBottom: React.FC = ({ children }) => {
  const [height, setHeight] = useState(100);
  return (
    <Box
      height={height}
      background="#fff"
      position="absolute"
      justifyContent="center"
      alignItems="center"
      padding={10}
      width="100%"
      bottom={0}
      style={{
        shadowColor: "rgba(9,30,66,0.13)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65
      }}
      onLayout={e => {
        setHeight(e.nativeEvent.layout.height);
      }}
    >
      {children}
    </Box>
  );
};
