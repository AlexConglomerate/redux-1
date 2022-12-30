import httpService from "./http.service";

const todosEndepointTodos = "todos/";
const todosEndepointPosts = "posts/";
const todosService = {
    fetch: async () => {
        const {data} = await httpService.get(todosEndepointTodos, {
            params: {
                _page: 1,
                _limit: 10,
            },
        });
        return data;
    },
    set: async ({title, completed}) => {
        const {data} = await httpService.post(todosEndepointPosts, {
            params: {
                title: title,
                completed: completed,
            },
        });
        return data;
    },
};
export default todosService;
