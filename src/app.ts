import express, {NextFunction, Request as ExRequest, Response as ExResponse} from "express";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import {RegisterRoutes} from "../routes/routes";
import {ValidateError} from "@tsoa/runtime";
import {createConnection} from "typeorm";
import {BadRequest} from "./types/errors";
import {AuthError} from "./middleware/auth";
import {User} from "./entity/User";
import {Token} from "./entity/Token";
import {Meta} from "./entity/Meta";

export const app = express();
createConnection({
    type: "sqlite",
    database: __dirname + "/db/meta.sqlite",
    synchronize: true,
    logging: true,
    entities: [
        User,
        Token,
        Meta
    ],
}).then(()=>{
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    app.use(bodyParser.json());
    app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
        return res.send(
            swaggerUi.generateHTML(await import("../build/swagger.json"))
        )
    })

    RegisterRoutes(app);

    app.use(function notFoundHandler(_req, res: ExResponse) {
        res.status(404).send({
            message: "Not Found",
        });
    });

    app.use(function errorHandler(
        err: unknown,
        req: ExRequest,
        res: ExResponse,
        next: NextFunction
    ): ExResponse | void {
        if (err instanceof ValidateError) {
            console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
            return res.status(422).json({
                success: false,
                message: "Validation Failed",
                details: err?.fields,
            });
        }
        if (err instanceof AuthError) {
            return res.status(401).json({
                success: false,
                message: err.message,
                result: "Auth Error"
            })
        }
        if (err instanceof BadRequest) {
            return res.status(400).json({
                success: false,
                message: err.message,
                result: "Bad Request"
            })
        }
        if (err instanceof Error) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }

        next();
    });
});

