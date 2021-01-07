const graphql = require('graphql');
const User = require('../Models/User');
const axios = require("axios").default;





const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
});



//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                const user = User.findById(args.id);
                return user;
                //return userData.find(user => user.id === args.id);
            }
        },
        users: {
            type: GraphQLList(UserType),

            resolve(parent, args) {
                const users = User.find();
                return users;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                profession: {type: GraphQLString}
            },

            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                })

                user.save();
                return user;
            }     
        }, 

        updateUser: {
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: new GraphQLNonNull(GraphQLString)},
            },

            resolve(parent, args) {
                return User.findByIdAndUpdate(
                    args.id,
                    {
                        $set: { //this is no longer required
                            name: args.name
                        }
                    },
                    {new: true,
                    //upsert: true this is for findoneandupdate to create a row if one is not found by combining filter and update values
                    }
                );
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});