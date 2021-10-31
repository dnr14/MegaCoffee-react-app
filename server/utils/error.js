function makeError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function emptyCheck(data) {
  if (
    data === "" ||
    data === "undefined" ||
    data === null ||
    data === undefined
  ) {
    return true;
  }
  return false;
}

module.exports = {
  makeError,
  emptyCheck,
};
