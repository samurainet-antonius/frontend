<template>
    <div class="mt-5">

        <div class="row">
            <div class="col-lg-10 mx-auto mb-4">
                <div class="section-title text-center ">
                    <h3 class="top-c-sep">Login</h3>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="career-search mb-60 bg-white">
                    <div class="p-4">
                        <div class="alert alert-danger" v-for="(error, index) in errors" :key="index">
                            {{ error[0] }}
                        </div>
                        <form method="POST">

                            <div class="form-group">
                                <label for="email">Email</label>
                                <input id="email" type="email" class="form-control" v-model="form.email">
                            </div>

                            <div class="form-group">
                                <label for="nama">Password</label>
                                <input type="password" class="form-control" v-model="form.password">
                            </div>

                            <button class="btn btn-primary" type="button" @click="login"><i class="fa fa-save"></i> Save</button>
                        </form>  
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:'Login',
    data(){
        return {
            form: {
                email: '',
                password: '',
            },
            errors: null
        }
    },
    methods:{
        login(){
            this.$store.dispatch('login', this.form)
                .then(response => {
                    console.log(response)
                this.$router.push({name: 'members'})
                }).catch(error => {
                    this.errors = error.response.data.errors
                })
        }
    }
}
</script>