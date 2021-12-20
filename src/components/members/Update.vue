<template>
    <div class="mt-5">

        <div class="row">
            <div class="col-lg-10 mx-auto mb-4">
                <div class="section-title text-center ">
                    <h3 class="top-c-sep">Create New Member</h3>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="career-search mb-60 bg-white">
                    <div class="p-4">
                        <form @submit.prevent="updateMember">
                            <div class="form-group">
                                <label for="nama">Nama Lengkap</label>
                                <input type="text" class="form-control" v-model="nama">
                            </div>

                            <div class="form-group">
                                <label for="email">Email</label>
                                <input id="email" type="email" class="form-control" v-model="email">
                            </div>

                            <div class="form-group">
                                <label for="alamat">Alamat</label>
                                <textarea id="alamat" v-model="alamat" class="form-control"></textarea>
                            </div>

                            <div class="preview" v-if="preview">
                                <p>Preview: </p>
                                <img :src="preview" width="200" height="150">
                            </div>

                            <div class="form-group">
                                <label for="avatar">Avatar</label>
                                <input id="avatar" type="file"  ref="avatarFile" class="form-control" @change="changeAvatar">
                            </div>

                            <button class="btn btn-primary"><i class="fa fa-save"></i> Save</button>
                        </form>  
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {HTTP} from '../../helpers/http-common'
import Swal from 'sweetalert2'

export default {
    name:'MemberUpdate',
    data(){
        return {
            nama:'',
            email:'',
            alamat:'',
            avatar:'',
            preview : null,
            uuid:this.$route.params.uuid
        }
    },
    mounted(){
        this.detailMember()
    },
    methods:{
        detailMember(){
            HTTP.get(`members/${this.uuid}`)
                    .then(response =>{
                        let data = response.data.data
                        this.nama = data.nama
                        this.email = data.email
                        this.alamat = data.alamat
                        this.preview = process.env.STATIC_ASSET+data.avatar
                    })
                    .catch(err =>{
                        console.log(err)
                    })
        },
        changeAvatar(event) {
            this.avatar = event.target.files[0];
            this.preview = URL.createObjectURL(event.target.files[0]);  
        },
        updateMember(){
            const formData = new FormData();
            formData.append('nama', this.nama);
            formData.append('email', this.email);
            formData.append('alamat', this.alamat);
            (this.avatar) ? formData.append('avatar', this.avatar) : ''
            formData.append('_method', 'PUT');

            HTTP.post(`members/update/${this.uuid}`,formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    if(response.data.status == "success"){
                        Swal.fire({
                            title: 'Success',
                            text: 'Member successfully changed',
                            icon: 'success',
                        })
                        this.$router.push({ name: 'members' })
                    }
                }).catch(err=>{
                    console.log(err)
                })
        }
    }
}
</script>