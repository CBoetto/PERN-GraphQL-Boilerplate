import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        me: User
        user(id: ID!): User
        users: [User!]
    }

    type User {
        id: ID!
        userName: String!
        posts: [Post!]
        err: String!
    }

    
    type LoginResponse {
        token: String
        user: User
    }
`