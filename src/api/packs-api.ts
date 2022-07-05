import {instance} from "./instance";


export const packsApi = {
    getPacks(search?: string, sliderParams?: number[]) {
        return instance.get('cards/pack', {
            params: {
                min: sliderParams[0],
                max: sliderParams[1]
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