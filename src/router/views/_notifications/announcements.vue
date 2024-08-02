<template>
    <Layout>
		<PageHeader :title="title" :items="items" />
        <div class="col-7">
            <div class="text-end mx-3 mb-3">
                <button class="btn btn-dark btn-sm" @click="create_modal = true">
                    <i class="bx bx-plus"></i>Create New
                </button>
            </div>
            <div class="card">
                <div class="row p-4">
                    <div class="col-3">
                        <label>Enter Keyword</label>
                        <input class="form-control" placeholder="Keyword..."/>
                    </div>
                </div>
                <div class="table-responsive px-4">
                    <table class="table table-nowrap align-middle mb-0">
                        <thead class="bg-dark text-white">
                            <tr>
                                <th style="width: 25%;">Name</th>
                                <th style="width: 25%;" >Description</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data, i in data.list" :key="i">
                                <td>{{data.name}}</td>
                                <td>{{data.description}}</td>
                                <td>{{data.type}}</td>
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
                    size="md"
                    title="EDIT" 
                    >
                    <div class="row">
                        <div class="col-6">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="mb-3">
                                <label>NAME</label>
                                <input class="form-control" type="text" v-model="pl_edit.name">
                            </div>
                            <div class="mb-3">
                                <label>Description</label>
                                <input class="form-control" type="text" v-model="pl_edit.description">
                            </div>
                        </div>
                    </div>
                    <div class="text-end mt-3">
                        <b-button class="mx-1" variant="secondary" @click="edit_modal = false">Close</b-button>
                        <b-button class="mx-1" variant="info" @click="updateNotification()">Update</b-button>
                    </div>
                </b-modal>
                <b-modal 
                    v-model="create_modal" 
                    no-close-on-backdrop
                    hide-footer
                    size="md"
                    title="CREATE NEW" 
                    >
                    <div class="row">
                        <div class="col-6">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="mb-3">
                                <label>NAME</label>
                                <input class="form-control" type="text" v-model="pl.name">
                            </div>
                            <div class="mb-3">
                                <label>Description</label>
                                <input class="form-control" type="text" v-model="pl.description">
                            </div>
                            <div class="mb-3">
                                <input
                                    type="file"
                                    ref="uploadFile"
                                    multiple 
                                    class="form-control mb-3" 
                                    @change="handleFileSelect" accept="image/*,video/*"
                                    />
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="text-end mt-3">
                        <b-button class="mx-1" variant="secondary" @click="create_modal = false">Close</b-button>
                        <b-button class="mx-1" variant="info" @click="createNotification()">Create</b-button>
                    </div>
                </b-modal>
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
            pl:{
                name: null,
                description: null,
            },
            pl_edit:{
                name: null,
                description: null,
            },
            edit_data: [],
            selectedMedia:[],
            edit_modal: false,
            create_modal: false,
            id: "",
        };
    },
    methods: {
		...mapActions("notifications", {
			newCreate: "createNew",
			getList: "notificationList",
			notificationUpdate: "updateNotification",
			notificationDelete: "deleteNotification",
		}),
        async initList(p) {
			var pl = {
				page: p,
                limit: this.filters.limit,
                type: "announcement"
			};
			const data = await this.getList(pl);
			this.data.list = data.data;
			this.data.links = data.links;
			this.data.current_page = data.current_page;
			this.data.per_page = data.per_page;
			this.data.last_page = data.last_page;
		},
        getData(data){
            this.edit_modal = true;
            this.id = data._id
            this.pl_edit.name = data.name;
            this.pl_edit.description = data.description;
            this.pl_edit.type = data.type;
        },
        handleFileSelect(event) {
            this.selectedMedia = Array.from(event.target.files);
        },
        async createNotification(){
            const fd = new FormData();
            this.selectedMedia.forEach((file, index) => {
                fd.append(`media[${index}]`, file);
            });
            fd.append('name', this.pl.name);
            fd.append('description', this.pl.description);
            fd.append('type', 'announcement');
            const confirmed = await Swal.fire({
                title: 'You want to Create this?',
                html: `<table class="table table-bordered table-sm font-size-12 text-start">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                        <td>${this.pl.name}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>${this.pl.description}</td>
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
                const res = await this.newCreate(fd);
                if (res.status == 200|| res.status == 'success') {
                    Swal.fire({
                        title: "Success",
                        html: `Creation successful.`,
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
        async updateNotification(){
            var pl = {
                id: this.id,
                name: this.pl_edit.name,
                description: this.pl_edit.description,
                type: "announcement",
            }
            const confirmed = await Swal.fire({
                title: 'You want to update this?',
                html: `<table class="table table-bordered table-sm font-size-12 text-start">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                        <td>${this.pl_edit.name}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>${this.pl_edit.description}</td>
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
                const res = await this.notificationUpdate(pl);
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
                title: 'Are you sure you want to DELETE this?',
                html: `<table class="table table-bordered table-sm font-size-12 text-start">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>${data.name}</td>
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
                const res = await this.notificationDelete(pl);
                if (res.status == 200|| res.status == 'success') {
                    Swal.fire({
                        title: "Success",
                        html: `Deletion Successful.`,
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
