const app = require("./app.js");

const PORT = 9090;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});