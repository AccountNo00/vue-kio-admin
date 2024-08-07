import $api from "../api";
// import axios from "axios";
export const actions = {
    getAdmins({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .get(`admins?`+ new URLSearchParams(pl).toString(), {
                    headers: {
                        Authorization: rootGetters["auth/bearer_token"],
                    },
                })
                .then(function (res) {
                    if (res.status == 200) {
                        resolve(res.data.data);
                    }
                })
                .catch(function (err) {
                    if (err.response.status == 401) {
                        dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
                    }
                });
        });
    },
    createAdmin({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .post(`admin`,pl,{
                    headers: {
                        Authorization: rootGetters["auth/bearer_token"],
                    },
                })
                .then(function (res) {
                    if (res.status == 200) {
                        resolve(res.data);
                    }
                })
                .catch(function (err) {
                    if (err.response.status == 401) {
                        dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
                    }
                    if(err.response.status == 422){
                        resolve(err.response.data.message);
                    }
                });
        });
    },
    updateAdmin({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .post(`admin/${pl.id}`,pl,{
                    headers: {
                        Authorization: rootGetters["auth/bearer_token"],
                    },
                })
                .then(function (res) {
                    if (res.status == 200) {
                        resolve(res.data);
                    }
                })
                .catch(function (err) {
                    if (err.response.status == 401) {
                        dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
                    }
                    if(err.response.status == 422){
                        resolve(err.response.data.message);
                    }
                });
        });
    },
    deleteAdmin({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .delete(`admin/${pl.id}`,{
                    headers: {
                        Authorization: rootGetters["auth/bearer_token"],
                    },
                })
                .then(function (res) {
                    if (res.status == 200) {
                        resolve(res.data);
                    }
                })
                .catch(function (err) {
                    if (err.response.status == 401) {
                        dispatch("auth/logoutUser", {}, { root: true }).then(() => { });
                    }
                    if(err.response.status == 422){
                        resolve(err.response.data.message);
                    }
                });
        });
    },
};
export default {
    namespaced: true,
    actions
};