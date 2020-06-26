import { variant, VariantArgs } from "styled-system";
const common = {
  borderRadius: 3,
  border: "1px solid transparent",
  px: 4,
  py: 3,
  m: 1
};

export const type = (props: any) =>
  variant({
    prop: "variant",
    variants: {
      default: {
        ...common,
        bg: props.appearance,
        borderColor: props.appearance
      },
      outline: {
        ...common,
        backgroundColor: "transparent",
        borderColor: props.appearance
      },
      text: {
        ...common,
        backgroundColor: "transparent"
      }
    }
  } as VariantArgs);

export default { type };
