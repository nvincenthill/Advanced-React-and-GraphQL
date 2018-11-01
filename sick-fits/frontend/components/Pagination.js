import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";
const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (loading) {
          return "Loading ... ";
        }
        if (error) {
          return "Error";
        }
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        return (
          <PaginationStyles>
            <p>
              Page {props.page} of {pages}
            </p>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

export default Pagination;
