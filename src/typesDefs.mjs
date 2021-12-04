import { gql } from 'apollo-server'
export const typeDefs = gql`
    type Book {
        _id: ID!
        title: String!
        author: String!
    }

    type Category {
        name: String
        books: [Book]
    }

    type Query {
        books: [Book]!
        searchBookById(_id: ID!): Book!
        searchBookByCriteria(book: BookInput): Book!
    }

    type  Mutation {
        addBook(book: BookInput!): Book!
        deleteBook(_id: ID!): Book!
        updateBook(_id: ID!, book: BookInput!): Book!
    }

    input BookInput {
        _id: ID
        title: String
        author: String
    }
`;