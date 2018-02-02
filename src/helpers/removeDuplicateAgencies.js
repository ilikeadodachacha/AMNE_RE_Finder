const removeDuplicateAgencies = (agencies) => {
  const seen = {};
  return agencies.filter((agency) => {
    if (!seen[agency.id]) {
      seen[agency.id] = true;
      return agency;
    }
  });
};

module.exports = removeDuplicateAgencies;
