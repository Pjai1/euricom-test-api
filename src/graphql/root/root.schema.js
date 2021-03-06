const { gql } = require('apollo-server');

const Query = `
  type Query {
    product(id: Int): Product
    allProducts(
      orderBy: String
      first: Int
      after: String
      before: String
      last: Int
    ): ProductConnection

    """
    ### &nbsp;&nbsp;Get the basket with key
    """
    basket(checkoutID: String!): Basket

    task(id: Int): Task
    tasks: [Task]

    user(id: Int): User
    allUsers(
      orderBy: String
      first: Int
      after: String
      before: String
      last: Int
    ): UserConnection
  }
`;

const Mutation = gql`
  type Mutation {
    """
    ### &nbsp;&nbsp;Create/save a product
    """
    addOrUpdateProduct(input: ProductInput!): AddOrUpdateProductPayload
    """
    ### &nbsp;&nbsp;Remove a product
    """
    deleteProduct(id: Int!): DeleteProductPayload

    """
    ### &nbsp;&nbsp;Add product to basket
    1. If the product already exist in the basket the quantity is added
    2. Product not found: 404 error
    3. Product not in stock: 409 error
    """
    addItemToBasket(input: AddItemToBasketInput!): AddItemToBasketPayload
    """
    ### &nbsp;&nbsp;Remove the product from the basket
    """
    removeItemFromBasket(input: RemoveItemFromBasketInput!): RemoveItemFromBasketPayload
    """
    ### &nbsp;&nbsp;Empty the basket
    """
    clearBasket(checkoutID: ID): ClearBasketPayload

    addTask(desc: String!): AddTaskPayload
    completeTask(id: Int!): CompleteTaskPayload
    deleteTask(id: Int!): DeleteTaskPayload

    addOrUpdateUser(input: UserInput!): AddOrUpdateUserPayload
    deleteUser(id: Int!): DeleteUserPayload
  }
`;

module.exports = {
  getSchema() {
    const moduleArray = [];
    moduleArray[0] = Query;
    moduleArray[1] = Mutation;
    return moduleArray;
  },
};
