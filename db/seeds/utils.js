const db = require("../../connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createLookupRef = (data, currentKey, targetKey) => {
  const ref = {};
  data.forEach((datum) => {
    const currentValue = datum[currentKey];
    ref[currentValue] = datum[targetKey]
  })
  return ref;
}