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
    <PaginationStyles>
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
            <p>
              Page {count} of {pages}
            </p>
          );
        }}
      </Query>
    </PaginationStyles>
  );
};

export default Pagination;
