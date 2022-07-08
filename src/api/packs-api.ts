import {instance} from "./instance";


export const packsApi = {
    getPacks( sliderParams: number[], search?: string, userId?: string, sort?: string) {
        debugger
        return instance.get('cards/pack', {
            params: {
                packName: search,
                min: sliderParams[0],
                max: sliderParams[1],
                user_id: userId,
                sortPacks: sort,
            }
        })
    },
    addPack() {
        return instance.post('cards/pack', {cardsPack: {name: 'My Pack'}})
    },
    deletePick(idPack: string) {
        return instance.delete('cards/pack', {
            params: {
                id: idPack
            }
        })
    },
    editPack(idPack: string) {
        return instance.put('cards/pack', {cardsPack: {_id: idPack, name: "Edit My Pack"}})
    },
}