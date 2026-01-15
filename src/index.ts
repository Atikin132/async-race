import App from "./app/app.js";
import { Router } from "./app/router.js";
import { Garage } from "./pages/garage/garage.js";
import { Winners } from "./pages/winners/winners.js";

const app = new App(document.body);

app.register("garage", new Garage());
app.register("winners", new Winners());

const router = new Router(app);
router.init();

app.navigate("garage");
