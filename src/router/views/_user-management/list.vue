<template>
    <Layout>
		<PageHeader :title="title" :items="items" />
        <div class="text-end mx-3 mb-3">
            <button class="btn btn-dark btn-sm" @click="create_modal = true">
                <i class="bx bx-plus"></i>Add User
            </button>
        </div>
        <div class="card">
            <div class="row p-4">
                <div class="col-3">
                    <label>Enter Keyword</label>
                    <input class="form-control" placeholder="Keyword..."/>
                </div>
                <div class="col-3">
                    <label>Status</label>
                    <select class="form-control">
                        <option>Fullname</option>
                        <option>Email</option>
                        <option>Contact No.</option>
                        <option>Status</option>
                    </select>
                </div>
            </div>
            <div class="table-responsive px-4">
                <table class="table table-nowrap align-middle mb-0">
                    <thead class="bg-dark text-white">
                        <tr>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th style="width: 20%;">Date Created</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data, i in data.list" :key="i">
                            <td>{{data.first_name + ' ' + data.last_name }}</td>
                            <td>{{data.username}}</td>
                            <td>{{data.email_address}}</td>
                            <td>{{`${dateOnly(data.created_at)} at ${timeOnly(data.created_at)}`              }}
                            </td>
                            <td>
                                <span class="badge bg-info text-uppercase ">{{data.role}}</span>
                            </td>
                            <td>
                                <div class="d-flex">
                                    <button class="btn btn-light bt btn-sm d-flex mx-1" title="Change Password" @click="getData(data,true)">
                                        <i class="bx bx-lock fs-5 m-0 p-0"></i>
                                    </button>
                                    <button class="btn btn-light bt btn-sm d-flex mx-1" title="EDIT" @click="getData(data,false)">
                                        <i class="bx bx-edit fs-5 m-0 p-0"></i>
                                    </button>
                                    <button v-if="data.is_ban == 0" class="btn btn-light text-success btn-sm d-flex mx-1" title="Ban" @click="changeBan(data,'ban')">
                                        <i class="bx bx-toggle-right fs-5 m-0 p-0"></i>
                                    </button>
                                    <button v-if="data.is_ban == 1" class="btn btn-light text-danger btn-sm d-flex mx-1" title="Ban" @click="changeBan(data,'unban')">
                                        <i class="bx bx-toggle-left fs-5 m-0 p-0"></i>
                                    </button>
                                    <!-- <button class="btn btn-light text-danger btn-sm d-flex mx-1" title="DELETE" @click="deleteUser(data)">
                                        <i class="bx bx-trash fs-5 m-0 p-0"></i>
                                    </button> -->
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Pagination :data="data" @emitPage="initList"/>
            </div>
            <!-- MODALS -->
            <b-modal 
                v-model="edit_modal" 
                no-close-on-backdrop
                hide-footer
                size="md"
                title="EDIT USER" 
                >
                <!-- <div class="row">
                    <div class="col-6">
                        <b-form-group
                            class="mb-3"
                            label="Role"
                            label-for="formrow-inputSearch">
                            <b-form-select v-model="pl.role">
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                                <option value="seller">Seller</option>
                                <option value="buyer">Buyer</option>
                            </b-form-select>
                        </b-form-group>
                    </div>
                </div> -->
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label>FIRST NAME</label>
                            <input class="form-control" type="text" v-model="pl.first_name">
                        </div>
                        <div class="mb-3">
                            <label>LAST NAME</label>
                            <input class="form-control" type="text" v-model="pl.last_name">
                        </div>
                        <div class="mb-3">
                            <label>USERNAME</label>
                            <input class="form-control" type="text" v-model="pl.username">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mb-3">
                        <label>EMAIL ADDRESS</label>
                        <input class="form-control" type="text" v-model="pl.email_address">
                    </div>
                </div>
                <!-- <div class="row">
                    <div class="col-12">
                        <label>NEW PASSWORD</label>
                        <input class="form-control" placeholder="Enter new password" type="text" v-model="pl.new_pFassword">
                    </div>
                </div> -->
                <div class="text-end mt-3">
                    <b-button class="mx-1" variant="secondary" @click="edit_modal = false">Close</b-button>
                    <b-button class="mx-1" variant="info" @click="updateUser()">Update</b-button>
                </div>
            </b-modal>
            <b-modal 
                v-model="change_password_modal" 
                no-close-on-backdrop
                hide-footer
                size="md"
                title="CHANGE PASSWORD" 
                >
                <div class="row mb-3">
                    <div class="col-12">
                        <b-form-group class="mb-3" id="input-group-2" label="New Password" label-for="password">
                            <div class="d-flex">
                                <b-form-input v-if="showPassword" class="input eye-width" id="password"
                                    v-model="pl_change.password" type="text" placeholder="Enter your password" :class="{
                                        'is-invalid':
                                            submitted && v$.pl_change.password.$error,
                                    }">
                                </b-form-input>
                                <b-form-input v-else class="input eye-width" id="password" v-model="pl_change.password"
                                    type="password" placeholder="Enter your password" :class="{
                                        'is-invalid':
                                            submitted && v$.pl_change.password.$error,
                                    }">
                                </b-form-input>
                                <span @click="toggleShow"  class="icon is-small is-right eye-btn">
                                    <i class="fas"
                                        :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i>
                                </span>
                            </div>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <b-form-group class="mb-3" id="input-group-2" label="Confirm Password" label-for="password">
                            <div class="d-flex">
                                <b-form-input v-if="showConfirm" class="input eye-width" id="password2"
                                    v-model="pl_change.confirm_password" type="text" placeholder="Enter your password" :class="{
                                        'is-invalid':
                                            submitted && v$.pl_change.confirm_password.$error,
                                    }">
                                </b-form-input>
                                <b-form-input v-else class="input eye-width" id="password2" v-model="pl_change.confirm_password"
                                    type="password" placeholder="Enter your password" :class="{
                                        'is-invalid':
                                            submitted && v$.pl_change.confirm_password.$error,
                                    }">
                                </b-form-input>
                                <span @click="toggleShowConfirm"  class="icon is-small is-right eye-btn">
                                    <i class="fas"
                                        :class="{ 'fa-eye-slash': showConfirm, 'fa-eye': !showConfirm }"></i>
                                </span>
                            </div>
                        </b-form-group>
                    </div>
                </div>
                <div class="text-end mt-3">
                    <b-button class="mx-1" variant="secondary" @click="change_password_modal = false">Close</b-button>
                    <b-button class="mx-1" variant="info" @click="changePass()">Change Password</b-button>
                </div>
            </b-modal>
            <b-modal 
                v-model="create_modal" 
                no-close-on-backdrop
                hide-footer
                size="md"
                title="CREATE NEW USER" 
                >
                <div class="row">
                    <div class="col-6">
                        <b-form-group
                            class="mb-3"
                            label="Role"
                            label-for="formrow-inputSearch">
                            <b-form-select v-model="pl_create.role">
                                <option value="seller">Seller</option>
                            </b-form-select>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label>FIRST NAME</label>
                            <input class="form-control" type="text" v-model="pl_create.first_name">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="mb-3">
                            <label>LAST NAME</label>
                            <input class="form-control" type="text" v-model="pl_create.last_name">
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="mb-3">
                        <label>USERNAME</label>
                        <input class="form-control" type="text" v-model="pl_create.username">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-6">
                        <label>PASSWORD</label>
                        <input class="form-control" placeholder="Enter password" type="password" v-model="pl_create.password">
                    </div>
                    <div class="col-6">
                        <label>CONFIRM PASSWORD</label>
                        <input class="form-control" placeholder="Enter confirm password" type="password" v-model="pl_create.confirm_password">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-6">
                        <label>EMAIL ADDRESS</label>
                        <input class="form-control" type="email" v-model="pl_create.email_address">
                    </div>
                    <div class="col-6">
                        <label>BIRTHDAY</label>
                        <input class="form-control" type="date" v-model="pl_create.birthday">
                    </div>
                </div>
                <div class="text-end mt-3">
                    <b-button class="mx-1" variant="secondary" @click="create_modal = false">Close</b-button>
                    <b-button class="mx-1" variant="info" @click="createUser()">Create</b-button>
                </div>
            </b-modal>
        </div>
    </Layout>
</template>

<script>
import Layout from '../../layouts/main';
import appConfig from '@/app.config';
import PageHeader from '@/components/page-header';
import formatter from '@/mixins/formatter';
import { mapActions } from 'vuex';
import Pagination from "@/components/pagination";
import Swal from 'sweetalert2';
export default {
    page: {
        title: 'Users',
        meta: [
            {
                name: 'description',
                content: appConfig.description,
            },
        ],
    },
    mixins: [formatter],
    components: {
        Layout,PageHeader,Pagination
    },
    data() {
        return {
			title: "Users",
			items: [
				{
					text: "Dashboard",
					href: "/",
				},
				{
					text: "Users",
					active: true,
				},
			],
			data: {
				list: [],
				links: [],
				current_page: 1,
				per_page: 1,
				last_page: 1,
			},
            filters:{
                limit: 50,
            },
            pl_create:{
                username: null,
                first_name: null,
                last_name: null,
                email_address: null,
                new_password: null,
                address: null,
                // role: null,
                birthday: null,
            },
            pl:{
                username: null,
                first_name: null,
                last_name: null,
                email_address: null,
                new_password: null,
                address: null,
                role: null,
            },
            pl_change:{
                password: null,
                confirm_password: null,
            },
            edit_data: [],
            edit_modal: false,
            change_password_modal: false,
            create_modal: false,
            id: "",
            showPassword: false,
            showConfirm: false,
        };
    },
    methods: {
		...mapActions("userManagement", {
			userCreate: "createUser",
			userList: "getUsers",
			userUpdate: "updateUser",
			userChangePass: "changePassword",
			userDelete: "deleteUser",
			changeBanStatus: "isBan",
		}),
        async initList(p) {
			var pl = {
				page: p,
                limit: this.filters.limit,
			};
			const data = await this.userList(pl);
			this.data.list = data.data;
			this.data.links = data.links;
			this.data.current_page = data.current_page;
			this.data.per_page = data.per_page;
			this.data.last_page = data.last_page;
		},
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
        toggleShowConfirm() {
            this.showConfirm = !this.showConfirm;
        },
        getData(data,changePassword){
            console.log(data)
            if(changePassword == true){
                this.change_password_modal = true;
            }else{
                this.edit_modal = true;
            }
            this.id = data._id
            this.pl.username = data.username;
            this.pl.first_name = data.first_name;
            this.pl.last_name = data.last_name;
            this.pl.email_address = data.email_address;
            this.pl.address = data.address;
            this.pl.role = data.role;
        },
        async createUser(){
            var pl = {
                username: this.pl_create.username,
                first_name: this.pl_create.first_name,
                last_name: this.pl_create.last_name,
                email_address: this.pl_create.email_address,
                password: this.pl_create.password,
                confirm_password: this.pl_create.confirm_password,
                address: this.pl_create.address,
                role: this.pl_create.role,
                birthday: this.pl_create.birthday,
                id: this.id,
            }
            const confirmed = await Swal.fire({
                title: 'Add this user?',
                html: `<table class="table table-bordered table-sm font-size-12 text-start">
                            <tbody>
                                <tr>
                                    <th>Username</th>
                                        <td>${this.pl_create.username}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>${this.pl_create.role}</td>
                                </tr>
                            </tbody>
                        </table>`,
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#74788d',
            }).then((result) => {
                return result.value;
            });
            if (confirmed) {
                const res = await this.userCreate(pl);
                if (res.status == 200|| res.status == 'success') {
                    Swal.fire({
                        title: "Success",
                        html: `Admin successfully updated.`,
                        type: "success",
                        icon: "success",
                        padding: "2em",
                    });
                    this.initList(1);
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
        async changePass(){
            var pl = {
                id: this.id,
                new_password: this.pl_change.password,
                new_password_confirmation: this.pl_change.confirm_password
            }
            const confirmed = await Swal.fire({
                title: 'Change password of this user?',
                html: `<table class="table table-bordered table-sm font-size-12 text-start">
                            <tbody>
                                <tr>
                                    <th>Username</th>
                                        <td>${this.pl.username}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>${this.pl.role}</td>
                                </tr>
                            </tbody>
                        </table>`,
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#74788d',
            }).then((result) => {
                return result.value;
            });
            if (confirmed) {
                if(this.pl_change.password == this.pl_change.confirm_password){
                    const res = await this.userChangePass(pl);
                    if (res.status == 200|| res.status == 'success') {
                        Swal.fire({
                            title: "Success",
                            html: `User password changed.`,
                            type: "success",
                            icon: "success",
                            padding: "2em",
                        });
                        this.initList(1);
                        this.change_password_modal = false;
                    }else{
                        Swal.fire({
                            html: res,
                            type: "error",
                            icon: "error",
                            padding: "2em",
                        });
                    }
                }else{
                    Swal.fire({
                        html: 'New password & Confirm Password are not the same.',
                        type: "error",
                        icon: "error",
                        padding: "2em",
                    });
                }
                
            }
        },
        async updateUser(){
            var pl = {
                username: this.pl.username,
                first_name: this.pl.first_name,
                last_name: this.pl.last_name,
                email_address: this.pl.email_address,
                address: this.pl.address,
                // role: this.pl.role,
                id: this.id,
            }
            const confirmed = await Swal.fire({
                title: 'Add this user?',
                html: `<table class="table table-bordered table-sm font-size-12 text-start">
                            <tbody>
                                <tr>
                                    <th>Username</th>
                                        <td>${this.pl.username}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>${this.pl.role}</td>
                                </tr>
                            </tbody>
                        </table>`,
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#74788d',
            }).then((result) => {
                return result.value;
            });
            if (confirmed) {
                const res = await this.userUpdate(pl);
                if (res.status == 200|| res.status == 'success') {
                    Swal.fire({
                        title: "Success",
                        html: `Admin successfully updated.`,
                        type: "success",
                        icon: "success",
                        padding: "2em",
                    });
                    this.initList(1);
                    this.edit_modal = false;
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
        async deleteUser(data){
            var pl = {
                id: data._id,
            }
            const confirmed = await Swal.fire({
                title: 'Delete this user?',
                html: `<table class="table table-bordered table-sm font-size-12 text-start">
                            <tbody>
                                <tr>
                                    <th>Username</th>
                                    <td>${data.username}</td>
                                </tr>
                            </tbody>
                        </table>`,
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#74788d',
            }).then((result) => {
                return result.value;
            });
            if (confirmed) {
                const res = await this.userDelete(pl);
                if (res.status == 200|| res.status == 'success') {
                    Swal.fire({
                        title: "Success",
                        html: `Admin successfully deleted.`,
                        type: "success",
                        icon: "success",
                        padding: "2em",
                    });
                    this.initList(1);
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
        async changeBan(data,isBan){
            console.log(isBan)
            var pl = {
                id: data._id,
                is_ban: isBan
            }
            const confirmed = await Swal.fire({
                title: 'Change status of this user?',
                html: `<table class="table table-bordered table-sm font-size-12 text-start">
                            <tbody>
                                <tr>
                                    <th>Username</th>
                                    <td>${data.username}</td>
                                </tr>
                            </tbody>
                        </table>`,
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#74788d',
            }).then((result) => {
                return result.value;
            });
            if (confirmed) {
                const res = await this.changeBanStatus(pl);
                if (res.status == 200|| res.status == 'success') {
                    Swal.fire({
                        title: "Success",
                        html: `Status successfully changed.`,
                        type: "success",
                        icon: "success",
                        padding: "2em",
                    });
                    this.initList(1);
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
    mounted() {
        this.initList(1);
    },
};
</script>
<style scoped>
    
.eye-width {
    border-radius: 0px !important;
}

.eye-btn {
    background-color: transparent;
    border: none;
    border-radius: 0px !important;
	position: absolute;
	right: 40px;
	margin-top: 8px;
	color: rgb(95, 95, 95) !important;
}
</style>