import $api from "../api";
import router from "../../router/index";
import $cookies from "vue-cookies";
import Swal from 'sweetalert2';
export const state = {
    token: $cookies.get("token"),
    type: 1,
    id: 1,
    profile: {
        employee_id: null,
        username: null,
        first_name: null,
        last_name: null,
        contact_number: null,
        email: null,
        id: null,
        role: null,
        type: null,
        department: null,
        company: null,
        new_user: null,
        access: [],
        abilities: [],
    }
};
export const actions = {
    loginAdmin({ commit }, pl) {
        return new Promise(function (resolve) {
            $api
                .post("auth/admin/login", pl)
                .then(function (res) {  
                    if (res.status == 200 || res.status == 'success') {
                        console.log(res.data)
                        commit("setToken", res.data.data);
                        resolve(res);
                    }
                })
                .catch(function (err) {
                    if(err){
                        Swal.fire({
                            icon: "error",
                            title: "Failed",
                            html: `${err}`,
                            showConfirmButton: false,
                        });
                        resolve(err)
                    }
                });
        });
    },
    logoutUser({ commit, getters }) {
        return new Promise(function (resolve) {
            $api
                .get("auth/logout", {
                    headers: { Authorization: getters.bearer_token },
                })
                .then(function () {
                    commit("destroyAuth");
                    resolve(true);
                })
                .catch(function () {
                    commit("destroyAuth");
                    resolve(true);
                });
        });
    },
    getProfile({ commit, getters }) {
        return new Promise(function (resolve) {
            $api
                .get(
                    "auth/profile", {
                    headers: { Authorization: getters.bearer_token },
                }
                )
                .then(function (res) {
                    if (res.status === 200) {
                        commit("setProfile", res.data.data);
                    }
                    resolve(true);
                })
                .catch(function (err) {
                    if(err){
                        resolve(err)
                    }
                });

        });
    },
};

export const mutations = {
    triggerLoader(state, value) {
        state.profile.loading = Boolean(value)
        state.profile.routeTo = value ? value : null
    },
    setToken(state, data) {
        var token = `${data.token_type} ${data.access_token}`;
        $cookies.set("token", token);
        // state.access = data.abilities.split(",");
        // state.abilities = data.abilities.split(",");
        state.token = token;
    },
    setProfile(state, data) {
        state.profile.employee_id = data.employee_id;
        state.profile.username = data.username;
        state.profile.first_name = data.first_name;
        state.profile.last_name = data.last_name;
        state.profile.contact_number = data.contact_number;
        state.profile.email = data.email;
        state.profile.id = data._id;
        state.profile.type = data._type;
        state.profile.department = data._department;
        state.profile.company = data._company;
        state.profile.role = data._role;
        state.profile.new_user = data.new_user;
        // state.profile.abilities = data.abilities;
        // state.access = data.abilities.split(",");
        // state.abilities = data.abilities.split(",");
    },
    destroyAuth(state) {
        $cookies.remove("token");
        state.profile.employee_id = null;
        state.profile.username = null;
        state.profile.first_name = null;
        state.profile.last_name = null;
        state.profile.contact_number = null;
        state.profile.email = null;
        state.profile.id = null;
        state.profile.role = null;
        state.profile.type = null;
        state.profile.department = null;
        state.profile.company = null;
        state.profile.abilities = null;
        router.replace({ path: "/login" }).catch(() => { });
    }
};
export const getters = {
    authenticated(state) {
        return state.token != null;
    },
    bearer_token(state) {
        return 'Bearer ' + state.token;
    },
    profile(state) {
        return state.profile;
    },
    access(state) {
        var arr = [...state.access]
        if (state.access.includes("/user")) {
            arr.push("/role-management")
            arr.push("/company-management")
            arr.push("/department-management")
            console.log(arr)
        }
        return arr
    },
};