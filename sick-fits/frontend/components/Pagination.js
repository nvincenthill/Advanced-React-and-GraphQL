import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';

import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';
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
          return 'Loading ... ';
        }
        if (error) {
          return 'Error';
        }
        const count = data.itemsConnection.aggregate.count;
        const numPages = Math.ceil(count / perPage);
        const paginationStr = `Page ${props.page} of ${numPages}`;
        return (
          <PaginationStyles>
            <Head>
              <title>Zen Skunk | {paginationStr} </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: props.page - 1 }
              }}
            >
              <a className="prev" aria-disabled={props.page <= 1}>
                Prev
              </a>
            </Link>
            <p>{paginationStr}</p>
            {/* <p>{count} products</p> */}
            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: props.page + 1 }
              }}
            >
              <a className="prev" aria-disabled={props.page >= numPages}>
                Next
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

export default Pagination;
