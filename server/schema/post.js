import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        posts: [Post!]!
        post(id: ID!): Post!
    }

    extend type Mutation {
        createPost(content: String!): Post!
        deletePost(id: ID!): Boolean!
        register(userName: String!, email: String!, password: String!): LoginResponse
        login(userName: String!, password: String!): User
        logout: Boolean
    }

    type Post {
        id: ID!
        content: String!
        user: User!
    }
`
