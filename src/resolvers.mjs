const _books = [
    { title: 'GraphQL', author: 'Sutin' },
    { title: 'Sveltekit', author: 'Tan' },
    { title: 'Vue3', author: 'Bird' },
    { title: 'Angular', author: 'James' },
]

const _category = [
    {
        name: 'GraphQL',
        books: _books
    }
]

export const resolvers = {
    Query: {
        books: {
            description: 'get all books',
            resolve: () => _books
        },
        book: (parent, args, context) => {
            const { title } = args
            const foundBook = _books.find(book => book.title == title)
            return foundBook || null
        },
        bookCriteria: (parent, args, context) => {
            const { param: { title, author } } = args
            const foundBook = _books.find(book => book.title == title || book.author == author)
            return foundBook || null
        },
        category: {
            description: 'get all book in actegory',
            resolve: () => _category
        }
    },
    Mutation: {
        addBook: (parent, args, context) => {
            const { book } = args
            _books.push(book)
            return _books[_books.length - 1]
        }
    }
}