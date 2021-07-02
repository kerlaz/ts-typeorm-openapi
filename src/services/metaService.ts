import {ExistingMetaData, NewMetaData} from "../types/req-res";
import {getRepository} from "typeorm";
import {Meta} from "../entity/Meta";
import {Email} from "../types/common";
import {User} from "../entity/User";
import {AuthError} from "../middleware/auth";

class MetaService {
    public async add(metaData: NewMetaData, email: Email): Promise<ExistingMetaData>{
        const userRepo = getRepository(User);
        const user = await userRepo.findOne({
            where: {email},
        });
        if(!user){
            throw new AuthError('user not found')
        }
        const metaRepo = getRepository(Meta);
        const newMeta = await metaRepo.save({...metaData, user})
        console.log({newMeta});
        return await metaRepo.findOneOrFail(newMeta.id);
    }
    public async getAll(): Promise<ExistingMetaData[]> {
        const metaRepo = getRepository(Meta);
        return await metaRepo.find()
    }
}

export const metaService = new MetaService()