module.exports.add = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: `Sucessfully sent request to add an account, but we did nothing`
  });
};
