export default {
    Query: {
        posts: async (parent, args, { models }) => {
            return await models.Post.findAll();

        },
        post: async (parent, { id }, { models }) => {
            return await models.Post.findByPk(id)
        }
    },


    Post: {
        user: async (post, args, { models }) => {
            console.log(post.UserId)
            return await models.User.findByPk(post.UserId)
        }
    },
}