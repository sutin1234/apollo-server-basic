import { gql } from 'apollo-server'
export const typeDefs = gql`
    type Book {
        title: String!
        author: String!
    }

    type Category {
        name: String
        books: [Book]
    }

    type Query {
        books: [Book]!
        book(title: String!): Book!
        bookCriteria(param: BookInput): Book
        category: [Category]
    }

    type  Mutation {
        addBook(book: BookInput): Book
    }

    input BookInput {
        title: String
        author: String
    }
`;