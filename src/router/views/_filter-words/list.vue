<template>
    <Layout>
		<PageHeader :title="title" :items="items" />
        <div class="col-6">
            <div class="card">
                <div class="row p-4">
                    <div class="col-4">
                        <label>Enter Keyword</label>
                        <input class="form-control" placeholder="Keyword..."/>
                    </div>
                    <div class="col-8">
                        <div class="text-end mt-1">
                            <b-button variant="dark" class="mt-4" @click="create()">
                                <i class="bx bx-plus"></i>
                                Create
                            </b-button>
                        </div>
                    </div>
                </div>
                <div class="table-responsive px-4">
                    <table class="table table-nowrap align-middle mb-0">
                        <thead class="bg-dark text-white">
                            <tr>
                                <th>Fullname</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Date Created</th>
                                <th style="width: 10%;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data, i in 8" :key="i">
                                <td>Sample User</td>
                                <td>Sample Username</td>
                                <td>email@gmail.com</td>
                                <td>Feb 20,1234</td>
                                <td>
                                    <div class="d-flex">
                                        <button class="btn btn-warning bt btn-sm d-flex mx-1" title="Unban">
                                            UNBAN
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Pagination :data="data" @emitPage="initList"/>
                </div>
            </div>
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
		...mapActions("userManagement", {
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
        create(){
            this.$router.push({path:"/filter-words/create"});
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
