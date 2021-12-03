const books = [
    { title: 'GraphQL', author: 'Sutin' },
    { title: 'Sveltekit', author: 'Tan' },
    { title: 'Vue3', author: 'Bird' },
    { title: 'Angular', author: 'James' },
]

const categories = [
    {
        name: 'GraphQL',
        books: _books
    }
]

export const resolvers = {
    Query: {
        books: () => books,
        book: (parent, args, context) => {
            const { title } = args
            const foundBook = books.find(book => book.title == title)
            return foundBook || null
        },
        bookCriteria: (parent, args, context) => {
            const { param: { title, author } } = args
            const foundBook = books.find(book => book.title == title || book.author == author)
            return foundBook || null
        },
        category: () => categories
    },
    Mutation: {
        addBook: (parent, args, context) => {
            const { book } = args
            books.push(book)
            return books[_books.length - 1]
        }
    }
}