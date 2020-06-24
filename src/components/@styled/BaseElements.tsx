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

export const Box = styled.View<BoxProps>(
  compose(
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
  )
);
export const ScrollView = styled.ScrollView<BoxProps>(
  compose(
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
  )
);

export const Flexbox = styled(Box)<FlexboxProps>(flexbox);

type TextProps = SpaceProps &
  ColorProps &
  LayoutProps &
  BorderProps &
  TypographyProps;

export const Text = styled.Text<TextProps>(
  compose(
    space,
    color,
    layout,
    border,
    typography
  )
);

type IconProps = SpaceProps &
  ColorProps &
  LayoutProps &
  TypographyProps &
  PositionProps;

export const Icon = styled.Text<IconProps>(
  compose(
    space,
    color,
    layout,
    typography,
    position
  )
);

type InputProps = SpaceProps &
  Omit<ColorProps, "color"> &
  TypographyProps &
  BorderProps &
  LayoutProps;

export const Input = styled.TextInput<InputProps>(
  compose(
    space,
    color,
    typography,
    border,
    layout
  )
);
// export const Select = styled('select')<InputProps & ColorProps>(
//   compose(space, typography, border, layout),
// );

type ButtonProps = SpaceProps &
  TypographyProps &
  BorderProps &
  LayoutProps &
  ColorProps;

export const Button = styled.Button<ButtonProps>(
  compose(
    space,
    typography,
    border,
    layout,
    color
  )
);

// type AnchorProps = SpaceProps &
//   TypographyProps &
//   BorderProps &
//   LayoutProps &
//   ColorProps;

// export const Anchor = styled('a')<AnchorProps>(
//   compose(space, typography, border, layout, color),
// );

type ImageProps = SpaceProps & LayoutProps;

export const Image = styled.Image<ImageProps>(
  compose(
    space,
    layout
  )
);

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

export const FlexCenter = styled(FlexVerticallyCenter)`
  justify-content: center;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;
export type TInputProps = SpaceProps &
  Omit<ColorProps, "color"> &
  Omit<LayoutProps, "height" | "width" | "size"> &
  TypographyProps &
  BorderProps;

// export const TextArea = styled('textarea')<TInputProps>(
//   compose(space, color, layout, typography, border),
// );
