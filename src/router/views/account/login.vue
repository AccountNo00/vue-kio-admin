<script>
import Layout from "../../layouts/auth";

import { mapActions } from "vuex";
// import Swal from 'sweetalert2'
import appConfig from "@/app.config";
import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

/**
 * Login component
 */
export default {
	setup() {
		return { v$: useVuelidate() };
	},
	page: {
		title: "Login",
		meta: [
			{
				name: "description",
				content: appConfig.description,
			},
		],
	},
	components: {
		Layout,
	},
	data() {
		return {
			username: "admin",
			password: "password",
			submitted: false,
			authError: null,
			tryingToLogIn: false,
			isAuthError: false,
			change_password_modal:false,
		};
	},
	validations: {
		username: {
			required: helpers.withMessage("username is required", required),
		},
		password: {
			required: helpers.withMessage("Password is required", required),
		},
	},
	computed: {
		notification() {
			return this.$store ? this.$store.state.notification : null;
		},
	},
	methods: {
        ...mapActions('auth', {
            authAdmin: 'loginAdmin',
        }),
		...mapActions("auth", {
			getAuthProfile: "getProfile",
		}),
		async profileInterval() {
			await this.getAuthProfile();
		},
		async tryToLogIn() {
			this.submitted = true;
			this.v$.$touch();

			if (this.v$.$invalid) {
				return;
			} else {
                var fd = new FormData();
                fd.append('username', this.username);
                fd.append('password', this.password);
                const res = await this.authAdmin(fd);
                if (res.status === 'success' || res.status === 200) {
					this.profileInterval();
                    this.$router.replace({ path: '/' }).catch(() => {});
                }
			}
		},
	},
	mounted() {},
};
</script>

<template>
	<Layout>
		<div class="row justify-content-center">
			<div class="col-md-8 col-lg-6 col-xl-5">
				<div class="card overflow-hidden">
					<div class="bg-soft bg-primary">
						<div class="row">
							<div class="col-9">
								<div class="text-primary p-4">
								<h5 class="text-primary">Welcome Back !</h5>
								<p>Sign in to continue to Knock it off ADMIN.</p>
								</div>
							</div>
							<div class="col-3 align-self-end">
								<img
									src="@/assets/images/profile-img.png"
									alt
									class="img-fluid"
								/>
							</div>
						</div>
					</div>
					<div class="card-body pt-0">
						<div>
							<router-link to="/">
								<div class="avatar-md profile-user-wid mb-4">
									<span
										class="avatar-title rounded-circle bg-white"
									>
										<img src="@/assets/images/bag.jpg" alt height="34" />
										<!-- <i class="bx bx-log-in-circle text-white fs-1"></i> -->
									</span>
								</div>
							</router-link>
						</div>
						<b-alert
							v-model="isAuthError"
							variant="danger"
							class="mt-3"
							dismissible
							>{{ authError }}</b-alert
						>
						<div
							v-if="notification.message"
							:class="'alert ' + notification.type"
						>
							{{ notification.message }}
						</div>

						<b-form class="p-2" @submit.prevent="tryToLogIn">
							<b-form-group
								class="mb-3"
								id="input-group-1"
								label="Username"
								label-for="input-1"
							>
								<b-form-input
									id="input-1"
									v-model="username"
									type="text"
									placeholder="Enter username"
									:class="{
										'is-invalid':
											submitted && v$.username.$error,
									}"
								></b-form-input>
								<div
									v-for="(item, index) in v$.username.$errors"
									:key="index"
									class="invalid-feedback"
								>
									<span v-if="item.$message">{{
										item.$message
									}}</span>
								</div>
							</b-form-group>

							<b-form-group
								class="mb-3"
								id="input-group-2"
								label="Password"
								label-for="input-2"
							>
								<b-form-input
									id="input-2"
									v-model="password"
									type="password"
									placeholder="Enter password"
									:class="{
										'is-invalid':
											submitted && v$.password.$error,
									}"
								></b-form-input>
								<div
									v-if="submitted && v$.password.$error"
									class="invalid-feedback"
								>
									<span
										v-if="v$.password.required.$message"
										>{{
											v$.password.required.$message
										}}</span
									>
								</div>
							</b-form-group>
							<b-form-checkbox
								class="form-check me-2 mt-0"
								id="customControlInline"
								name="checkbox-1"
								value="accepted"
								unchecked-value="not_accepted"
								>Remember me
							</b-form-checkbox>
							<div class="mt-3 d-grid">
								<b-button
									type="submit"
									variant="primary"
									class="btn-block"
									>Log In</b-button
								>
							</div>
						</b-form>
					</div>
					<!-- end card-body -->
				</div>
				<!-- end row -->
			</div>
			<!-- end col -->
		</div>
		<!-- end row -->
	</Layout>
</template>