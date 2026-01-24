import App from "./app/app.js";
import { Router } from "./app/router.js";
import { Garage } from "./pages/garage/garage.js";
import { winnersUI } from "./pages/winners/winners.js";

const app = new App(document.body);

app.init("garage");
app.register("garage", new Garage());
app.register("winners", winnersUI);

const router = new Router(app);
router.init();

app.navigate("garage");
