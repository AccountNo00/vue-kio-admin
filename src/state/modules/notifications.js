import $api from "../api";
// import axios from "axios";
export const actions = {
    notificationList({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .get(`bulletins?` + new URLSearchParams(pl).toString(), {
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
    createNew({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .post(`bulletin`,pl, {
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
                });
        });
    },
    updateNotification({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .post(`bulletin/${pl.id}`,pl, {
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
                });
        });
    },
    deleteNotification({ rootGetters, dispatch },pl) {
        return new Promise(function (resolve) {
            $api
                .delete(`bulletin/${pl.id}`, {
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
                });
        });
    },
};
export default {
    namespaced: true,
    actions
};