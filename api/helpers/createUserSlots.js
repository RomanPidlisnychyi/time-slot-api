module.exports.createUserSlots = userId => {
  const hoursInWeek = 168;
  const slots = [];
  for (let i = 0; i < hoursInWeek; i++) {
    slots.push({ id: i + 1, hour: false });
  }

  return {
    userId,
    slots,
  };
};
