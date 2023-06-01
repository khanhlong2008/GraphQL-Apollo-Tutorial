const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const cors = require('cors')

const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')
//Load DB medthods
const mongoDataMethods = require('./data/db')

const main = async () => {
    // Connect to MongoDB
    const connectDB = async () => {
        try {
            await mongoose.connect('mongodb://localhost/GraphqlApollo', {
                // useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useFindAndModify: false
            }).then(() => {
                console.log('Connected database from mongodb 🚀🚀🚀.');
                app.listen(5000, () => {
                    console.log(`Server is running on port 5000🌳🌳🌳`);
                });
            })
                .catch(err => {
                    console.log('err', err);
                });
        } catch (error) {
            console.log(error.message)
            process.exit(1)
        }
    }
    connectDB();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ mongoDataMethods })
    })
    await server.start();
    const app = express();
    app.use(cors());
    server.applyMiddleware({ app })
    app.listen({ port: 4000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath} 🛩️🛩️🛩️`)
    )
}
main().catch(error => console.log(error))