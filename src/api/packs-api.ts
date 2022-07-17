import {instance} from "./instance";


export const packsApi = {
    getPacks( sliderParams: number[], search?: string, userId?: string, sort?: string, page?:number, pageCount?:number) {
        return instance.get('cards/pack', {
            params: {
                packName: search,
                min: sliderParams[0],
                max: sliderParams[1],
                user_id: userId,
                sortPacks: sort,
                page: page,
                pageCount: pageCount
            }
        })
    },
    addPack(newPack:string) {
        return instance.post('cards/pack', {cardsPack: {name: newPack}})
    },
    deletePick(idPack: string) {
        return instance.delete('cards/pack', {
            params: {
                id: idPack
            }
        })
    },
    editPack(idPack: string, newName:string) {
        return instance.put('cards/pack', {cardsPack: {_id: idPack, name: newName}})
    },
}