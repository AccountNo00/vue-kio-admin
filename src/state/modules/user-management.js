import $api from "../api";
// import axios from "axios";
export const actions = {
    getUsers({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .get(`users?`+ new URLSearchParams(pl).toString(), {
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
    createUser({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .post(`user`,pl,{
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
    updateUser({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .post(`user/update/${pl.id}`,pl,{
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
    changePassword({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .post(`user/update/${pl.id}`,pl,{
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
    deleteUser({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .delete(`user/${pl.id}`,{
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
    isBan({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .post(`user/ban/${pl.id}`,pl,{
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