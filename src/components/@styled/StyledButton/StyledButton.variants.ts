import { variant, VariantArgs } from "styled-system";

export const size = variant({
  prop: "size",
  variants: {
    small: {
      fontSize: 1,
      px: 4,
      py: 2
    },
    medium: {
      fontSize: 2,
      px: 6,
      py: 3
    },
    large: {
      fontSize: 3,
      px: 7,
      py: 4
    }
  }
} as VariantArgs);

const common = {
  borderRadius: 1,
  fontWeight: 500,
  border: "1px solid transparent"
};

export const type = (props: any) =>
  variant({
    prop: "variant",
    variants: {
      default: {
        ...common,
        color: "white",
        backgroundColor: props.appearance,
        textTransform: "uppercase",
        "&:hover": {
          backgroundColor: `light.${props.appearance}`
        }
      },
      outline: {
        ...common,
        color: props.appearance,
        backgroundColor: "transparent",
        textTransform: "uppercase",
        borderColor: props.appearance,
        "&:hover": {
          backgroundColor: `lightest.${props.appearance}`
        }
      },
      text: {
        ...common,
        color: props.appearance,
        backgroundColor: "transparent",
        textTransform: "uppercase",
        "&:hover": {
          backgroundColor: `lightest.${props.appearance}`
        }
      }
    }
  } as VariantArgs);

export default { type, size };
