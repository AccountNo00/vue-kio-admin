<template>
	<router-view></router-view>
	<div>
		<!-- MODALS -->
		<b-modal 
			v-model="change_password_modal"
			no-close-on-backdrop
			hide-footer
			size="md"
			title="CHANGE PASSWORD" 
			>
			<div class="row">
				<div class="col-12">
					<div class="mb-3">
						<label>CURRENT PASSWORD</label>
						<input class="form-control mb-3" type="password" v-model="pl.current_password">
						<label>NEW PASSWORD</label>
						<input class="form-control" type="password" v-model="pl.new_password">
					</div>
				</div>
			</div>
			<div class="text-end mt-3">
				<b-button class="mx-1" variant="secondary" @click="change_password_modal = false">Close</b-button>
				<b-button class="mx-1" variant="info" @click="changePW()">SUBMIT</b-button>
			</div>
		</b-modal>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import Swal from 'sweetalert2';
import { mapGetters } from "vuex";
export default {
	name: "App",
	data(){
		return{
			change_password_modal: false,
			pl:{
				current_password: '',
				new_password: '',
			},
		}
	},
	components: {},
	computed: {
        ...mapGetters('auth', ['profile']),
	},
	methods: {
		...mapActions("auth", {
			getAuthProfile: "getProfile",
		}),
        ...mapActions('changePassword', {
            changePass: 'changePassword',
        }),
		async profileInterval() {
			await this.getAuthProfile();
		},
		startInterval() {
			this.intervalId = setInterval(this.profileInterval, 10000);
		},
        async changePW(){
            var pl = {
				current_password: this.pl.current_password,
				new_password: this.pl.new_password
            }
            const confirmed = await Swal.fire({
                title: 'Are you sure you want to change password?',
                html: ``,
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#74788d',
            }).then((result) => {
                return result.value;
            });
            if (confirmed) {
                const res = await this.changePass(pl);
                if (res.status == 200 || res.status == 'success') {
                    Swal.fire({
                        title: "Success",
                        html: `Password successfuly changed`,
                        type: "success",
                        icon: "success",
                        padding: "2em",
                    });
					this.profileInterval();
					this.gotoLogin();
                    this.create_modal = false;
                }else{
                    Swal.fire({
                        html: res,
                        type: "error",
                        icon: "error",
                        padding: "2em",
                    });
                }
            }
        },
	},
    mounted(){
		if(this.$route.path != '/login'){
			this.profileInterval();
		}
        this.startInterval();
		if(this.profile.new_user == 1){
			this.change_password_modal = true;
		}
    },
};
</script>
