import "dotenv/config";
import app from "./app";
import { initDatabase } from "./db/init";

const PORT = process.env.PORT || 3000;

initDatabase();

app.listen(PORT, () => {
   console.log(`Сервер запущено: http://localhost:${PORT}`);
});
