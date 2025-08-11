import app from "./src/app.js";
import { config } from "./src/config/env.js";

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});
