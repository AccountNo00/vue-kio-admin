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
                            <b-button variant="info" class="mt-4" @click="create()">
                                <i class="bx bx-plus"></i>
                                Create
                            </b-button>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-nowrap align-middle mb-0">
                        <thead class="bg-dark text-white">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Date Created</th>
                                <th style="width:20%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data, i in 8" :key="i">
                                <td>{{i + 1}}</td>
                                <td>Noob</td>
                                <td>Feb 20,1234</td>
                                <td>
                                    <div class="d-flex">
                                        <button class="btn btn-light text-danger btn-sm d-flex mx-1" title="Delete">
                                            <i class="bx bx-trash fs-6"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
// import Swal from 'sweetalert2';
export default {
    page: {
        title: 'Ban Control',
        meta: [
            {
                name: 'description',
                content: appConfig.description,
            },
        ],
    },
    mixins: [formatter],
    components: {
        Layout,PageHeader
    },
    data() {
        return {
			title: "Ban Control",
			items: [
				{
					text: "Dashboard",
					href: "/",
				},
				{
					text: "Ban Control",
					active: true,
				},
			],
            data: {
                list: [],
                links: [],
                current_page: 1,
                per_page: 1,
                last_page: 1,
                total: 0,
                from: 0,
                to: 0,
            },
            filters: {
                search: '',
                application_type: null,
                sort: null,
                order: null,
                from: new Date(),
                to: new Date(),
                limit: 50,
                arena: 'All',
                site: 'All',
            },
        };
    },
    methods: {
        create(){
            this.$router.push({path:"/filter-words/create"});
        },
    },
    mounted() {
    },
};
</script>
