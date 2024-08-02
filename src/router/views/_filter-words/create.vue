<template>
    <Layout>
		<PageHeader :title="title" :items="items" />
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-10">
                            <div class="d-flex">
                                <h3>Filter Words / <span style="font-size:15px">Create</span></h3>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="text-end">
                                <b-button variant="dark" class="btn-sm" @click="back()">
                                    Back
                                </b-button>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <b-form-group
                            class="custom-group"
                            label="Name"
                            label-for="name">
                            <input class="form-control">
                        </b-form-group>
                    </div>
                    <div class="text-end">
                        <b-button variant="success">
                            Submit
                        </b-button>
                    </div>
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
        back(){
            this.$router.push({path:"/filter-words/list"});
        },
    },
    mounted() {
    },
};
</script>
