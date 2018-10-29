import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";

const CREATE_ITEM_MUTATION = gql``;

class CreateItem extends Component {
  state = {
    title: "Cool Shoes",
    description: "I love Shoes",
    image: "shoes.jpg",
    largerImage: "large-dog.jpg",
    price: 1000
  };

  // instance property with "this" access
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;

    // handle multiple input boxes with the same function using computed property names
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          console.log(this.state);
        }}
      >
        <h2>Sell an item</h2>
        <fieldset>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              required
              value={this.state.price}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Enter a Description"
              required
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </Form>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
