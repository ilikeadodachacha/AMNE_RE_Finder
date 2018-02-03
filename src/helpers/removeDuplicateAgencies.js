const hasExactAddress = (vicinity) => {
  return !isNaN(parseInt(vicinity));
};

const removeDuplicateAgencies = (agencies) => {
  const seen = {};
  return agencies.filter((agency) => {
    if (!seen[agency.id] && hasExactAddress(agency.vicinity)) {
      seen[agency.id] = true;
      return agency;
    }
  });
};

module.exports = removeDuplicateAgencies;
