import React from "react";
import { Modal } from "react-native";
import colors from "../../theme/colors";
import { Box, Flex } from "../../components/@styled/BaseElements";
import StyledButton from "../../components/@styled/StyledButton";

export interface IWithModalInjectedProps {
  showModal: (content: JSX.Element, actions?: ActionObject[] | null) => void;
  hideModal: () => void;
}

interface ActionObject {
  text: string;
  action: () => {};
}

export interface IState {
  open: boolean;
  content: JSX.Element | null;
  actions: ActionObject[] | null;
}

export default function withModal<IOriginalProps>(
  Component:
    | React.ComponentClass<IOriginalProps & IWithModalInjectedProps>
    | React.StatelessComponent<IOriginalProps & IWithModalInjectedProps>
): React.ComponentClass<IOriginalProps> {
  return class WithModal extends React.Component<IOriginalProps, IState> {
    constructor(props: IOriginalProps) {
      super(props);
      this.state = {
        open: false,
        content: null,
        actions: null
      };
    }

    showModal = (
      content: JSX.Element,
      actions: ActionObject[] | null = null
    ) => {
      this.setState({ open: true, content, actions });
    };

    hideModal = () =>
      this.setState({ open: false, content: null, actions: null });

    render() {
      const { actions, open } = this.state;
      return (
        <>
          <Component
            {...this.props}
            showModal={this.showModal}
            hideModal={this.hideModal}
          />
          {open && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={open}
              onRequestClose={this.hideModal}
            >
              <Box
                bg={"rgba(0,0,0,0.2)"}
                flex={1}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box
                  px={20}
                  py={24}
                  bg={colors.white}
                  borderRadius={4}
                  width={"80%"}
                >
                  {this.state.content}
                  <Flex flexDirection="row" justifyContent={"flex-end"}>
                    {actions &&
                      actions.length > 0 &&
                      this.state.actions.map((action, index) => {
                        return (
                          <StyledButton
                            key={action.text}
                            onPress={action.action}
                            variant={
                              actions.length !== 1 && index === 0
                                ? "text"
                                : "default"
                            }
                            title={action.text}
                          />
                        );
                      })}
                  </Flex>
                </Box>
              </Box>
            </Modal>
          )}
        </>
      );
    }
  };
}
