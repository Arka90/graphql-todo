// Write mutation here and export
const testMutation = {
  testMutation: (_root, { message }) => {
    console.log(message);
    return message;
  },
};

export default testMutation;
