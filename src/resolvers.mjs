import { Book } from "./Book.model.mjs"
import { connected } from './mongodb.mjs'

export const resolvers = {
    Query: {
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
        }
    }
}