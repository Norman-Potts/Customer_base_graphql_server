


### Customerbase GraphQL Server

An implementation of graphQL setup on the backend accessing a JSON server. No user interface in this project. Test with Graphiql.


How to use. 
To start up run 'npm run json:server' and then 'npm run dev:server'.
Json server runs on port 3000, and application on 4000.
Open http://localhost:4000/graphiql



Example of querying for a customer..
{
  customer(id:"2") {
    id,
    name,
    age
  }
}


Example of adding a customer...
mutation{
  addCustomer( name:"Norm", age: 4, email: "Norm@gmail.com"  ) {
    id,
    name,
    email
  }
}

Example of deleting a customer... 
mutation {
   deleteCustomer(id:"2"){
   id 
  }
}



Example of editing a customers...
mutation{
  editCustomer(id:"2", age: 4 ){
    id, 
    name
  }
}

mutation{
  editCustomer(id:"1", age: 31, name:"Jim Long" ){
    id, 
    name
  }
}








