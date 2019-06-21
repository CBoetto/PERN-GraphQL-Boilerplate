import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default {
    Query: {
        users: async (parent, args, { models }) => {
            return await models.User.findAll();
        },
        user: async (parent, { id }, { models }) => {
            return await models.User.findByPk(id);
        },
        me: async (parent, args, { models, me }) => {
            return await models.User.findByPk(me.id)
        },
    },

    User: {
        posts: async (user, args, { models })=> {
            return await models.Post.findAll({
                where: {
                    UserId: user.id
                }
            })
        }
    },
    Mutation: {
        login: async (parent, { userName, password }, { models, res }) => {
            const user = await models.User.findOne({ where: { userName }});
            const id = user.dataValues.id;
            const username = user.dataValues.userName

            if (!user) {
                throw new Error('Username not found.')
            }

            let correctPassword = await bcrypt.compare(password, user.dataValues.password)

            if (correctPassword === false) {
                throw new Error("Invalid password.");
            } else {
                let token = ''
                token = jwt.sign(
                    {
                        id: user.dataValues.id,
                        username: user.dataValues.userName
                    },
                    'superdupersecret',
                    {
                        expiresIn: '30d', // token will expire in 30 days
                    },
                )            
                res.cookie('COOKIE', token, { expires: new Date(Date.now() + 900000), httpOnly: true })
                return {
                    userName: username,
                    id
                }
            }


        },
        logout: (parent, args, { req, res }) => {
            res.cookie('COOKIE', '', { expires: new Date(Date.now() - 900000), httpOnly: true })
            console.log('logout mutation request, ', req.headers.cookie)
        },
        register: async (parent, { userName, email, password }, { models, res }) => {
                const hashedPassword = await bcrypt.hash(password, 10)
                const user = await models.User.create({
                userName,
                email,
                password: hashedPassword,
                })
                const token = jwt.sign(
                    {
                        id: user.id,
                        username: user.username
                    },
                    'superdupersecret',
                    {
                        expiresIn: '30d', // token will expire in 30 days
                    },
                )
                res.cookie('COOKIE', token, { expires: new Date(Date.now() + 900000), httpOnly: true })
            return {
                user
            }
        },
        createPost: async (parent, { content }, { me, models }) => {
            return await models.Post.create({
                content,
                userId: me.id
            })
        },
        deletePost: async(parent, { id }, { models }) => {
            console.log(id)
            return await models.Post.destroy({ where: { id }})
        }
    }
}