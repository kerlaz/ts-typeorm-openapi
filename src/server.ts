import { app } from "./app";
import {hosted} from "./config";

console.log(process.env.sso_url);

const port = process.env.PORT || hosted.port || 3000;

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);