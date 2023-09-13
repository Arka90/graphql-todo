const testQueries = {
  test: (_args, _params, context) => {
    console.log(context);
    return "Hello form graphql server";
  },
};

export default testQueries;
