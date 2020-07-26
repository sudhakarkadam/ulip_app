/* eslint-disable react/display-name */
import React from "react";
import styled from "styled-components/native";
import {
  space,
  color,
  layout,
  overflow,
  flexbox,
  border,
  typography,
  position,
  shadow,
  background,
  ColorProps,
  LayoutProps,
  OverflowProps,
  TypographyProps,
  SpaceProps,
  FlexboxProps,
  BorderProps,
  PositionProps,
  ShadowProps,
  BackgroundProps,
  compose
} from "styled-system";
import colors from "../../theme/colors";
import BackIcon from "../../images/back.svg";

export type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  OverflowProps &
  BorderProps &
  PositionProps &
  ShadowProps &
  BackgroundProps &
  TypographyProps;
const blockElements = compose(
  space,
  color,
  layout,
  flexbox,
  overflow,
  border,
  position,
  shadow,
  background,
  typography
);
export const Box = styled.View<BoxProps>(blockElements);

export const ScrollView = styled.ScrollView<BoxProps>(blockElements);
export const TouchableOpacity = styled.TouchableOpacity<BoxProps>(
  blockElements
);
export const TouchableNativeFeedback = styled.TouchableNativeFeedback<BoxProps>(
  blockElements
);

export const Flexbox = styled(Box)<FlexboxProps>(flexbox);

type TextProps = SpaceProps &
  ColorProps &
  LayoutProps &
  BorderProps &
  TypographyProps;

const StyledText = styled.Text<TextProps>(
  compose(space, color, layout, border, typography)
);

export const Text = styled(StyledText)`
  font-family: Roboto-Regular;
`;

export const StyledActivityIndicator = styled.ActivityIndicator<
  ColorProps & SpaceProps
>(compose(color, space));

type InputProps = SpaceProps &
  Omit<ColorProps, "color"> &
  TypographyProps &
  BorderProps &
  LayoutProps;

export const Input = styled.TextInput<InputProps>(
  compose(space, color, typography, border, layout)
);

export const StyledTextInput = styled(Input)`
  color: ${colors.primary};
  border: solid 1px ${colors.grays[2]};
  font-size: 16px;
  width: 100%;
  padding: 8px 20px;
  border-radius: 2px;
`;

type ImageProps = SpaceProps & LayoutProps;

export const Image = styled.Image<ImageProps>(compose(space, layout));
export const Icon = styled(Image)`
  resize-mode: contain;
  width: 18px;
  height: 18px;
`;

export const Flex = styled(Flexbox)`
  display: flex;
`;

export const FlexVerticallyCenter = styled(Flex)`
  align-items: center;
`;

export const FlexHorizontallyCenter = styled(Flex)`
  justify-content: center;
`;

export const FlexSpaceAround = styled(Flex)`
  justify-content: space-around;
  align-items: center;
`;
export const FlexSpaceBetween = styled(Flex)`
  justify-content: space-between;
  align-items: center;
`;

export const FlexCenter = styled(FlexVerticallyCenter)`
  justify-content: center;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexRow = styled(Flex)`
  flex-direction: row;
`;
export type TInputProps = SpaceProps &
  Omit<ColorProps, "color"> &
  Omit<LayoutProps, "height" | "width" | "size"> &
  TypographyProps &
  BorderProps;

export const TextWrapper = (props: {
  children: React.ReactNode;
  label: React.ReactNode;
}) => {
  return (
    <Flex mt={5}>
      <Text mb={3} color={`${colors.grays[5]}`} fontSize={1}>
        {props.label}
      </Text>
      {props.children}
    </Flex>
  );
};

export const HeaderOptions = {
  headerStyle: { backgroundColor: colors.bg, elevation: 0 },
  headerTitleStyle: { color: colors.primary },
  headerBackImage: () => <BackIcon />
};
