import api from "./api";

const getHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getTasks = async (params) => {
    return await api.get("/tasks", {
        params,
        ...getHeader(),
    });
};

export const createTask = async (data) => {
    return await api.post("/tasks", data, getHeader());
};

export const updateTask = async (id, data) => {
    return await api.put(`/tasks/${id}`, data, getHeader());
};

export const deleteTask = async (id) => {
    return await api.delete(`/tasks/${id}`, getHeader());
};