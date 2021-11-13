import axios from './axios'
import * as ApiPath from './apis'

export default {
    auth(url = ApiPath){
        return{
            signup:data=>axios.post(url.register_uri,data),//register(post)
            login:data=>axios.post(url.login_uri,data),//login(post)
            // create:newrecord=>axios.post('/post',newrecord),//create(post)
            // update:(id,updaterecord)=>axios.put('/update/'+id,updaterecord),//update(put)
            // delete:id=>axios.delete('/delete/'+id)//delete(delete)
        }
    }
}