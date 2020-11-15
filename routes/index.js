module.exports = async (router) => {
  router.use("/api/user", require("./user"));
  router.use("/api/others",require("./others"))
  router.use("/api/classes",require("./classes"))
  router.use("/api/mission",require("./mission"))
};
