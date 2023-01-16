module.exports = {
  format_date: (date) => {
    return `${date.getMonth() + 1}/${
      date
    .getDate()}/${date.getFullYear()}`;
  },
    // format_date: (date) => {
    //   // Format date as MM/DD/YYYY
    //   return date.toLocaleDateString();
    // },
};
