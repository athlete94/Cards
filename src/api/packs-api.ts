import {instance} from "./instance";


export const packsApi ={
    getPacks(){
       return instance.get('cards/pack')
    },
    addPack(){
        return instance.post('cards/pack', {cardsPack: {name: 'My Pack'}})
    },
    deletePick(idPack:string){
        return instance.delete('cards/pack', {
            params:{
                id:idPack
            }
        })
    },
    editPack(idPack:string){
        return instance.put('cards/pack', {cardsPack: {_id: idPack, name:"Edit My Pack"}})
    },
}