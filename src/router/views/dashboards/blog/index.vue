<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import Visitors from "./visitors";
import Comments from "./comment";
import BlogPost from "./blog-post";

/**
 * Blog dashboard component
 */
export default {
	page: {
		title: "Dashboard",
		meta: [{ name: "description", content: appConfig.description }],
	},
	components: {
		Layout,
		PageHeader,
		Visitors,
		Comments,
		BlogPost,
	},
	data() {
		return {
			title: "Dashboard",
			items: [
				{
					text: "Dashboard",
					href: "/",
				},
				{
					text: "",
					active: true,
				},
			],
		};
	},
};
</script>

<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<div>
			<div class="row">
				<div class="col-xl-8">
					<div class="row">
						<div class="col-lg-4">
							<div class="card mini-stats-wid">
								<div class="card-body">
									<div class="d-flex flex-wrap">
										<div class="me-3">
											<p class="text-muted mb-2">
												Total Users
											</p>
											<h5 class="mb-0">120</h5>
										</div>

										<div class="avatar-sm ms-auto">
											<div
												class="avatar-title bg-light rounded-circle text-primary font-size-20"
											>
												<i class="bx bx-user"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-lg-4">
							<div class="card blog-stats-wid">
								<div class="card-body">
									<div class="d-flex flex-wrap">
										<div class="me-3">
											<p class="text-muted mb-2">
												Total Posts
											</p>
											<h5 class="mb-0">86</h5>
										</div>

										<div class="avatar-sm ms-auto">
											<div
												class="avatar-title bg-light rounded-circle text-primary font-size-20"
											>
												<i class="bx bx-edit"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="card blog-stats-wid">
								<div class="card-body">
									<div class="d-flex flex-wrap">
										<div class="me-3">
											<p class="text-muted mb-2">
												Comments
											</p>
											<h5 class="mb-0">4,235</h5>
										</div>

										<div class="avatar-sm ms-auto">
											<div
												class="avatar-title bg-light rounded-circle text-primary font-size-20"
											>
												<i class="bx bx-message"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- end row -->

					<div class="card">
						<Visitors />
					</div>
				</div>
				<!-- end col -->

				<div class="col-xl-4">
					<div class="card">
						<div class="card-body">
							<div class="d-flex">
								<div class="me-3">
									<img
										src="@/assets/images/users/avatar-1.jpg"
										alt=""
										class="avatar-sm rounded-circle img-thumbnail"
									/>
								</div>
								<div class="flex-grow-1">
									<div class="d-flex">
										<div class="flex-grow-1">
											<div class="text-muted">
												<h5 class="mb-1">Admin</h5>
												<p class="mb-0">
													Administrator
												</p>
											</div>
										</div>

										<!-- <b-dropdown
                      toggle-class="btn-sm"
                      variant="light"
                      right
                      class="ms-2"
                      menu-class="dropdown-menu-end"
                    >
                      <template #button-content>
                        <i class="bx bxs-cog align-middle me-1"></i> Setting
                      </template>
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else</a>
                    </b-dropdown> -->
									</div>
									<hr />
									<div class="row">
										<!-- <div class="col-6">
                      <div>
                        <p class="text-muted text-truncate mb-2">Total Announcements</p>
                        <h5 class="mb-0">32</h5>
                      </div>
                    </div> -->
										<div class="col-6">
											<div>
												<p
													class="text-muted text-truncate mb-2"
												>
													Subscribes
												</p>
												<h5 class="mb-0">10k</h5>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
                    <div class="card">
                        <div class="card-body">
                            <h5>Recent Announcements</h5>
                            <div class="table-responsive">
                                <table class="table table-striped table-nowrap align-middle mb-0">
                                    <thead class="bg-light">
                                        <tr>
                                            <th>TEXT</th>
                                            <th>DATE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="data, i in 8" :key="i">
                                            <td>Sample Announcement</td>
                                            <td>Feb 20, 2023</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- <div
                                    class="no-data"
                                    v-if="!loading && data.list.length < 1">
                                    <i class="mdi mdi-database-alert"></i> No data found
                                </div> -->
                            </div>
                        </div>
                    </div>
				</div>
				<!-- end col -->
			</div>
			<!-- end row -->

			<div class="row">
				<div class="col-xl-6 col-lg-6">
					<BlogPost />
				</div>
				<div class="col-xl-6 col-lg-6">
					<Comments />
				</div>
				<!-- end col -->
			</div>
			<!-- end row -->
		</div>
	</Layout>
</template>