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
                                    <button class="btn btn-light bt btn-sm d-flex mx-1" title="EDIT" @click="getData(data)">
                                        <i class="bx bx-edit fs-5 m-0 p-0"></i>
                                    </button>
                                    <button class="btn btn-light text-danger btn-sm d-flex mx-1" title="DELETE" @click="deleteUser(data)">
                                        <i class="bx bx-trash fs-5 m-0 p-0"></i>
                                    </button>
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
                size="lg"
                title="VIEW USER" 
                >
                <div class="row">
                    <div class="col-6">
                        <b-form-group
                            class="mb-3"
                            label="Role"
                            label-for="formrow-inputSearch">
                            <b-form-select v-model="pl.role">
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                                <!-- <option value="seller">Seller</option>
                                <option value="buyer">Buyer</option> -->
                            </b-form-select>
                        </b-form-group>
                    </div>
                </div>
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
                    <div class="col-6 mb-3">
                        <label>EMAIL ADDRESS</label>
                        <input class="form-control" type="text" v-model="pl.email_address">
                    </div>
                    <div class="col-6 mb-3">
                        <label>COMPLETE ADDRESS</label>
                        <input class="form-control" type="text" v-model="pl.address">
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-12">
                        <label>NEW PASSWORD</label>
                        <input class="form-control" placeholder="Enter new password" type="text" v-model="pl.new_pFassword">
                    </div>
                </div>
                <div class="text-end mt-3">
                    <b-button class="mx-1" variant="secondary" @click="edit_modal = false">Close</b-button>
                    <b-button class="mx-1" variant="info" @click="updateUser()">Update</b-button>
                </div>
            </b-modal>
            <b-modal 
                v-model="create_modal" 
                no-close-on-backdrop
                hide-footer
                size="lg"
                title="CREATE NEW USER" 
                >
                <div class="row">
                    <div class="col-6">
                        <b-form-group
                            class="mb-3"
                            label="Role"
                            label-for="formrow-inputSearch">
                            <b-form-select v-model="pl_create.role">
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                                <!-- <option value="seller">Seller</option>
                                <option value="buyer">Buyer</option> -->
                            </b-form-select>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label>FIRST NAME</label>
                            <input class="form-control" type="text" v-model="pl_create.first_name">
                        </div>
                        <div class="mb-3">
                            <label>LAST NAME</label>
                            <input class="form-control" type="text" v-model="pl_create.last_name">
                        </div>
                        <div class="mb-3">
                            <label>USERNAME</label>
                            <input class="form-control" type="text" v-model="pl_create.username">
                        </div>
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
                <hr>
                <div class="row mb-3">
                    <div class="col-6 mb">
                        <label>PASSWORD</label>
                        <input class="form-control" placeholder="Enter password" type="password" v-model="pl_create.password">
                    </div>
                    <div class="col-6 mb">
                        <label>CONFIRM PASSWORD</label>
                        <input class="form-control" placeholder="Enter confirm password" type="password" v-model="pl_create.confirm_password">
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3">
                        <label>COMPLETE ADDRESS</label>
                        <input class="form-control" type="text" v-model="pl_create.address">
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
                role: null,
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
            edit_data: [],
            edit_modal: false,
            create_modal: false,
            id: "",
        };
    },
    methods: {
		...mapActions("adminManagement", {
			adminCreate: "createAdmin",
			adminList: "getAdmins",
			adminUpdate: "updateAdmin",
			adminDelete: "deleteAdmin",
		}),
        async initList(p) {
			var pl = {
				page: p,
                limit: this.filters.limit,
			};
			const data = await this.adminList(pl);
			this.data.list = data.data;
			this.data.links = data.links;
			this.data.current_page = data.current_page;
			this.data.per_page = data.per_page;
			this.data.last_page = data.last_page;
		},
        getData(data){
            this.edit_modal = true;
            this.id = data._id
            this.pl.username = data.username;
            this.pl.first_name = data.first_name;
            this.pl.last_name = data.last_name;
            this.pl.email_address = data.email_address;
            this.pl.new_password = data.new_password;
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
                const res = await this.adminCreate(pl);
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
        async updateUser(){
            var pl = {
                username: this.pl.username,
                first_name: this.pl.first_name,
                last_name: this.pl.last_name,
                email_address: this.pl.email_address,
                new_password: this.pl.new_password,
                address: this.pl.address,
                role: this.pl.role,
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
                const res = await this.adminUpdate(pl);
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
                const res = await this.adminDelete(pl);
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
    },
    mounted() {
        this.initList(1);
    },
};
</script>
