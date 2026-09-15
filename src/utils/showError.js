function showError(error) {
  if (error.response && error.response.data.message) {
    return error.response.data.message;
  }
  return "Something went wrong";
}

export default showError;
