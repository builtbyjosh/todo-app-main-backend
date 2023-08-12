import { default as axios } from "axios";
import graphql from "graphql";

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    todos: {
      type: new GraphQLList(TodoType),
      async resolve(parentValue, args) {
        const res = await axios.get(
          `http://localhost:3000/users/${parentValue.id}/todos`
        );
        return res.data;
      },
    },
  }),
});

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      async resolve(parentValue, args) {
        const res = await axios.get(
          `http://localhost:3000/users/${parentValue.userId}`
        );
        return res.data;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const res = await axios.get(`http://localhost:3000/users/${args.id}`);
        return res.data;
      },
    },
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const res = await axios.get(`http://localhost:3000/todos/${args.id}`);
        return res.data;
      },
    },
  },
});

const todoMutation = new GraphQLObjectType({
  name: "TodoMutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, args) {
        console.log("ARGS: ", args);
        const res = await axios.post(`http://localhost:3000/todos`, args);
        console.log("RES-DATA: ", res.data);
        return res.data;
      },
    },
    deleteTodo: {
      type: TodoType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(parentValue, { id }) {
        const res = await axios.delete(`http://localhost:3000/todos/${id}`);
        return res.data;
      },
    },
    updateTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        const res = await axios.patch(
          `http://localhost:3000/todos/${args.id}`,
          args
        );
        return res.data;
      },
    },
  },
});

const userMutation = new GraphQLObjectType({
  name: "UserMutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        userName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, args) {
        console.log("ARGS: ", args);
        const res = await axios.post(`http://localhost:3000/users`, args);
        console.log("RES-DATA: ", res.data);
        return res.data;
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(parentValue, { id }) {
        const res = await axios.delete(`http://localhost:3000/users/${id}`);
        return res.data;
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        const res = await axios.patch(
          `http://localhost:3000/users/${args.id}`,
          args
        );
        return res.data;
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, args) {
        console.log("ARGS: ", args);
        const res = await axios.post(`http://localhost:3000/todos`, args);
        console.log("RES-DATA: ", res.data);
        return res.data;
      },
    },
    deleteTodo: {
      type: TodoType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(parentValue, { id }) {
        const res = await axios.delete(`http://localhost:3000/todos/${id}`);
        return res.data;
      },
    },
    updateTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        const res = await axios.patch(
          `http://localhost:3000/todos/${args.id}`,
          args
        );
        return res.data;
      },
    },
    addUser: {
      type: UserType,
      args: {
        userName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, args) {
        console.log("ARGS: ", args);
        const res = await axios.post(`http://localhost:3000/users`, args);
        console.log("RES-DATA: ", res.data);
        return res.data;
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(parentValue, { id }) {
        const res = await axios.delete(`http://localhost:3000/users/${id}`);
        return res.data;
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        const res = await axios.patch(
          `http://localhost:3000/users/${args.id}`,
          args
        );
        return res.data;
      },
    },
  },
});

// const mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     todos: { type: todoMutation },
//     users: { type: userMutation },
//   },
// });

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
