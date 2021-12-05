import { Book } from "./Book.model.mjs"
import { connected } from './mongodb.mjs'
import { users } from './users.mjs'
import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server-express'

export const resolvers = {
    Query: {
        viewer: (parent, args, { user }) => {
            if (!user) {
                throw new UserInputError('Invalid Headers', {
                    argumentName: 'Authorization: Bearer ${token}'
                });
            }
            return users.find(({ id }) => id === user.sub)
        },
        books: async () => {
            connected();
            const books = await Book.find({})
            console.log(books);
            return books || [];
        },
        searchBookById: async (parent, args, context) => {
            const { _id } = args
            const book$ = await Book.findById(_id).exec()
            console.log(book$);
            return book$;
        },
        searchBookByCriteria: async (parent, args, context) => {
            const { book } = args
            const book$ = await Book.findOne(book).exec()
            console.log(book$);
            return book$;

        },
        user: async (parent, { id }) => {
            return users.find(user => user.id === id)
        }
    },
    Mutation: {
        addBook: async (parent, args, context) => {
            const { book } = args
            connected();
            const book$ = new Book(book);
            await book$.save();
            return book$;
        },
        updateBook: async (parent, args, context) => {
            const { _id, book } = args
            connected();
            const find = _id

            const book$ = await Book.findByIdAndUpdate(find, book)
            console.log(book$);
            return book$;
        },
        deleteBook: async (parent, args, context) => {
            const { _id } = args
            connected();
            const find = _id
            const book$ = await Book.findByIdAndDelete(find)
            console.log(book$);
            return book$;
        },
        login: async (parent, { email, password }) => {
            const { id, permissions, roles } = users.find(user => user.email === email && user.password === password)
            return jwt.sign(
                { 'https://thinnydev.com': { roles, permissions } },
                "SECRET",
                { algorithm: "HS256", subject: id, expiresIn: "1d" }
            )
        }
    }
}