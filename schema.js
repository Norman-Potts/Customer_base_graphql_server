const axios = require('axios'); //// A client to make http requests.


//// Bring in tools from graphql.
const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


/*
//// Hard coded data.
const customers = [
    {id:'1', name:'John Doe', email: 'Jdoe@gmail.com', age: 35 },
    {id:'2', name:'Steve Smith', email: 'SteveS@gmail.com', age: 32 },
    {id:'3', name:'Sara Williams', email: 'SaraW@gmail.com', age: 32 },
];
*/


const CustomerType = new GraphQLObjectType({
    name:'customers',
    //// The fields we want for a customer, and set their types.
    fields:() => ({   
        id:{type:GraphQLString},
        name:{type: GraphQLString},
        email: {type: GraphQLString},
        age: {type:GraphQLInt},
    })
});





//// Root Query
const RootQuery = new GraphQLObjectType({  
    name:'RootQueryType',
    fields:{
        customer: {
            type:CustomerType,
            args:{
                id:{type:GraphQLString}   
            },
            resolve(parentValue, args){
                /* /// for hardcoded data.
                for(let i = 0; i< customers.length; i++ ) {
                    if(customers[i].id == args.id) {
                        return customers[i];
                    }
                }
                */    
               //// make a get request using axios to the json server. Include ID to customers.             
                return axios.get('http://localhost:3000/customers/'+args.id)
                      .then(res => res.data );                      
            }
        }, 
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/customers/')
                      .then(res => res.data );
            }
        }
    }
});



//// Mutations allow you to alter data.
const mutation  = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addCustomer:{
            type:CustomerType, 
            args: {
                name:{type: new GraphQLNonNull( GraphQLString )},
                email:{type: new GraphQLNonNull( GraphQLString )},
                age:{type: new GraphQLNonNull( GraphQLInt )},
            },
            resolve(parentValue, args ){
                return axios.post('http://localhost:3000/customers', {
                    name:args.name,
                    email:args.email,
                    age:args.age
                })
                .then(res => res.data );
            }
        },
        deleteCustomer:{
            type:CustomerType, 
            args: {
                id:{type: new GraphQLNonNull( GraphQLString )},
            },
            resolve(parentValue, args ){
                return axios.delete('http://localhost:3000/customers/' + args.id)
                .then(res => res.data );
            }
        },
        editCustomer:{
            type:CustomerType, 
            args: {
                id:{type: new  GraphQLNonNull( GraphQLString) },
                name:{type:  GraphQLString },
                email:{type:   GraphQLString },
                age:{type:   GraphQLInt }
            },
            resolve(parentValue, args ){
                return axios.patch('http://localhost:3000/customers/'+args.id, args )
                .then(res => res.data );
            }
        },
    }
})




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});