module.exports = {
    date_created: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
};