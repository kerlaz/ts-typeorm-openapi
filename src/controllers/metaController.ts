import {Body, Get, Post, Route, Tags} from "tsoa";
import {Controller} from "@tsoa/runtime";
import {authService} from "../services/authService";
import {AddMetaRequest, ExistingMetaData, MetaResponse} from "../types/req-res";
import {metaService} from "../services/metaService";
import {User} from "../entity/User";


@Route("meta")
@Tags("Meta Data")
export class MetaController extends Controller {
    @Post("/add")
    public async add(
        @Body() params: AddMetaRequest
    ):Promise<MetaResponse> {
        console.log(params);
        const {valid, email} = await authService.checkToken(params.accessToken);
        if (valid) {
            return {
                success: true,
                data: await metaService.add(params.data, email)
            }
        } else {
            throw new Error('oops... service unavailable')
        }
    }
    @Get("/get")
    public async get():Promise<MetaResponse> {
        console.log("params")
        return {
            success: true,
            data: await metaService.getAll()
        }
    }
}