import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputProps
} from "react-native";
import { TranslationText } from "./InternationalisationProvider";

type CallBackFn = (val: any, i: number, ar: any[]) => boolean;
function baseFindIndex(
  array: string[],
  predicate: CallBackFn,
  fromIndex: number,
  fromRight = true
): number {
  const { length } = array;
  let index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
function findLastIndex(
  array: any[],
  predicate: CallBackFn,
  fromIndex?: number
) {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  let index = length - 1;
  if (fromIndex !== undefined) {
    index =
      fromIndex < 0
        ? Math.min(length + fromIndex, 0)
        : Math.max(fromIndex, length - 1);
  }
  return baseFindIndex(array, predicate, index, true);
}
interface Styles {
  container: ViewStyle;
  codeInput: TextStyle;
}
const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20
  },
  codeInput: {
    backgroundColor: "transparent",
    textAlign: "center",
    padding: 0
  }
});

type IInputPosition = "center" | "left" | "right";
interface ICodeInputProps extends TextInputProps {
  codeLength: number;
  inputPosition: IInputPosition;
  size: number;
  space: number;
  className: string;
  cellBorderWidth: number;
  activeColor: string;
  inactiveColor: string;
  autoFocus: boolean;
  codeInputStyle: TextStyle;
  containerStyle?: ViewStyle;
  onFulfill: (arg1: string) => Promise<boolean>;
}
interface ICodeInputState {
  codeArr: string[];
  currentIndex: number;
  isVerifyingInput: boolean;
}
export default class ConfirmationCodeInput extends Component<
  ICodeInputProps,
  ICodeInputState
> {
  static defaultProps = {
    codeLength: 5,
    inputPosition: "center",
    autoFocus: true,
    size: 40,
    className: "border-box",
    cellBorderWidth: 1,
    activeColor: "rgba(255, 255, 255, 1)",
    inactiveColor: "rgba(255, 255, 255, 0.2)",
    space: 8,
    containerStyle: {}
  };
  private codeInputRefs: (TextInput | null)[] = [];
  constructor(props: ICodeInputProps) {
    super(props);

    this.state = {
      codeArr: new Array(this.props.codeLength).fill(""),
      currentIndex: 0,
      isVerifyingInput: false
    };

    this.codeInputRefs = [];
  }

  componentDidMount() {
    const { inputPosition } = this.props;
    if (
      ["center", "left", "right", "full-width"].indexOf(inputPosition) === -1
    ) {
      console.error(
        "Invalid input position. Must be in: center, left, right, full"
      );
    }
  }

  clear() {
    this.setState({
      codeArr: new Array(this.props.codeLength).fill(""),
      currentIndex: 0,
      isVerifyingInput: false
    });
    this._setFocus(0);
  }

  _setFocus(index: number) {
    const ref = this.codeInputRefs[index];
    if (ref) {
      ref.focus();
    }
  }

  _blur(index: number) {
    const ref = this.codeInputRefs[index];
    if (ref) {
      ref.blur();
    }
  }

  _onFocus(index: number) {
    const newCodeArr = this.state.codeArr.slice(0);
    const currentEmptyIndex = findLastIndex(newCodeArr, c => !c);
    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return this._setFocus(currentEmptyIndex);
    }
    const codeArr = newCodeArr.map((value, i) => {
      return i >= index ? "" : value;
    });

    this.setState({
      codeArr: codeArr,
      currentIndex: index
    });
  }

  _getContainerStyle(size: number, position: IInputPosition): ViewStyle {
    switch (position) {
      case "left":
        return {
          justifyContent: "flex-start",
          height: size
        };
      case "center":
        return {
          justifyContent: "center",
          height: size
        };
      case "right":
        return {
          justifyContent: "flex-end",
          height: size
        };
      default:
        return {
          justifyContent: "space-between",
          height: size
        };
    }
  }

  _getInputSpaceStyle(space: number) {
    const { inputPosition } = this.props;
    switch (inputPosition) {
      case "left":
        return {
          marginRight: space
        };
      case "center":
        return {
          marginRight: space / 2,
          marginLeft: space / 2
        };
      case "right":
        return {
          marginLeft: space
        };
      default:
        return {
          marginRight: 0,
          marginLeft: 0
        };
    }
  }

  _getClassStyle(className: string, active: boolean): TextStyle {
    const { cellBorderWidth, activeColor, inactiveColor, space } = this.props;
    const classStyle = {
      ...this._getInputSpaceStyle(space),
      color: activeColor
    };

    switch (className) {
      case "clear":
        return Object.assign({}, classStyle, { borderWidth: 0 });
      case "border-box":
        return Object.assign({}, classStyle, {
          borderWidth: cellBorderWidth,
          borderColor: active ? activeColor : inactiveColor
        });
      case "border-circle":
        return Object.assign({}, classStyle, {
          borderWidth: cellBorderWidth,
          borderRadius: 50,
          borderColor: active ? activeColor : inactiveColor
        });
      case "border-b":
        return Object.assign({}, classStyle, {
          borderBottomWidth: cellBorderWidth,
          borderColor: active ? activeColor : inactiveColor
        });
      case "border-b-t":
        return Object.assign({}, classStyle, {
          borderTopWidth: cellBorderWidth,
          borderBottomWidth: cellBorderWidth,
          borderColor: active ? activeColor : inactiveColor
        });
      case "border-l-r":
        return Object.assign({}, classStyle, {
          borderLeftWidth: cellBorderWidth,
          borderRightWidth: cellBorderWidth,
          borderColor: active ? activeColor : inactiveColor
        });
      default:
        return classStyle;
    }
  }

  _onKeyPress(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    if (e.nativeEvent.key === "Backspace") {
      const { currentIndex } = this.state;
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      this._setFocus(nextIndex);
    }
  }

  _onInputCode(character: string, index: number) {
    const { codeLength, onFulfill } = this.props;
    const newCodeArr = this.state.codeArr.slice(0);
    let { isVerifyingInput } = this.state;
    newCodeArr[index] = character;

    if (index === codeLength - 1) {
      const code = newCodeArr.join("");
      isVerifyingInput = true;
      onFulfill(code).then(status => {
        // onFulfill(status);
        !status && this.clear();
      });
      this._blur(this.state.currentIndex);
    } else {
      this._setFocus(this.state.currentIndex + 1);
    }

    this.setState(prevState => ({
      isVerifyingInput,
      codeArr: newCodeArr,
      currentIndex: prevState.currentIndex + 1
    }));
  }

  render() {
    const {
      codeLength,
      codeInputStyle,
      containerStyle,
      inputPosition,
      autoFocus,
      className,
      size,
      activeColor
    } = this.props;

    const initialCodeInputStyle = {
      width: size,
      height: size
    };

    const codeInputs = [];
    for (let i = 0; i < codeLength; i++) {
      const id = i;
      codeInputs.push(
        <TextInput
          key={id}
          ref={ref => {
            this.codeInputRefs[id] = ref;
          }}
          style={[
            styles.codeInput,
            initialCodeInputStyle,
            this._getClassStyle(className, this.state.currentIndex === id),
            codeInputStyle
          ]}
          underlineColorAndroid="transparent"
          selectionColor={activeColor}
          returnKeyType={"done"}
          {...this.props}
          autoFocus={autoFocus && id === 0}
          onFocus={() => this._onFocus(id)}
          value={
            this.state.codeArr[id] ? this.state.codeArr[id].toString() : ""
          }
          onChangeText={text => this._onInputCode(text, id)}
          onKeyPress={e => this._onKeyPress(e)}
          maxLength={1}
        />
      );
    }

    return (
      <View
        style={[
          styles.container,
          this._getContainerStyle(size, inputPosition),
          containerStyle
        ]}
      >
        {// TODO: add animation/overlay for verifying text.
        this.state.isVerifyingInput ? (
          <TextInput>
            <TranslationText id="verifying"></TranslationText>
          </TextInput>
        ) : (
          codeInputs
        )}
      </View>
    );
  }
}
