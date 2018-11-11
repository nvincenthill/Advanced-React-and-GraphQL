import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Form from "./styles/Form";
import Error from "./ErrorMessage";

import { from } from "apollo-link";
class SignUp extends Component {
  render() {
    return (
      <Form>
        <fieldset>
          <h2>Sign Up</h2>
        </fieldset>
      </Form>
    );
  }
}

export default SignUp;
