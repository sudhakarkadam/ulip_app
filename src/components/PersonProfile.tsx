import React from "react";
import Input from "../components/InputComponent";
import StyledButton from "../components/@styled/StyledButton";
import { Flex } from "./@styled/BaseElements";
import { UserDataModel } from "../models/CommonModel";
import { PrimaryHeaderText } from "./@styled/Text";
import { Flex1 } from "./@styled/Flex";
import { ErrorText } from "./@styled/Text";

import { Page, PageContent } from "./@styled/Page";
import { Formik } from "formik";
import { tomatoBorder } from "../utils/tomatoBorder";

interface OwnProps {
  createProfileCallback: (data: { name: string }) => void;
  userInfo: UserDataModel | null;
}

const PersonProfile = (props: OwnProps) => {
  return (
    <Page>
      <PageContent>
        <Formik
          initialValues={{
            name: "",
            phone_number: `+91-${props.userInfo?.phone_number}`
          }}
          validate={values => {
            const errors: Partial<typeof values> = {};
            if (!values.name) {
              errors.name = "Please enter your name";
            }

            if (!values.phone_number) {
              errors.name = "Please enter your mobile number";
            }
            return errors;
          }}
          onSubmit={values => {
            props.createProfileCallback(values);
          }}
        >
          {({
            errors,
            isSubmitting,
            handleBlur,
            handleChange,
            values,
            handleSubmit
          }) => (
            <Flex1 p={6} mt={4} backgroundColor="white">
              <Flex mb={5}>
                <PrimaryHeaderText>Personal details</PrimaryHeaderText>
              </Flex>

              <Input
                onBlur={handleBlur("name")}
                value={values.name}
                onChangeText={handleChange("name")}
                label="Full name"
                style={tomatoBorder(errors.name)}
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
              <Input
                label="Mobile number"
                editable={false}
                onChangeText={handleChange("phone_number")}
                onBlur={handleBlur("phone_number")}
                value={values.phone_number}
              />
              <Flex mt={5}>
                <StyledButton
                  disabled={isSubmitting}
                  title="Save profile"
                  fontSize={14}
                  loading={isSubmitting}
                  onPress={handleSubmit}
                />
              </Flex>
            </Flex1>
          )}
        </Formik>
      </PageContent>
    </Page>
  );
};

export default PersonProfile;
