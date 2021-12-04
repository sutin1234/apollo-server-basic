import { rule, shield, and, or } from 'graphql-shield'

const checkPermission = (user, permission) => {
    if (user && user["https://thinnydev.com"]) {
        return user["https://thinnydev.com"].includes(permission)
    }
    return false
}

const isAuthenticated = rule()((parent, args, { user }) => {
    return user !== null;
})

const canReadAnyUser = rule()((parent, args, { user }) => {
    return checkPermission(user, "read:any_user")
})

const canReadOwnUser = rule()((parent, arts, { user }) => {
    return checkPermission(user, "read:own_user")
})

const canReadingOwnUser = rule()((parent, { id }, { user }) => {
    return user && user.sub === id
})

export const permissions = shield({
    Query: {
        user: or(and(canReadOwnUser, canReadingOwnUser), canReadAnyUser),
        viewer: isAuthenticated
    }
})