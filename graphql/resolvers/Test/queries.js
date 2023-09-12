const testQueries = {
  test: (_args, context) => {
    console.log(context);
    return "Hello form graphql server";
  },
};

export default testQueries;
