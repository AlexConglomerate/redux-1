import httpService from "./http.service";

const todosEndepoint = "todos/";
const todosEndepoint2 = "/posts";
const todosService = {
    fetch: async () => {
        const {data} = await httpService.get(todosEndepoint, {
            params: {
                _page: 1,
                _limit: 10,
            },
        });
        return data;
    },
    fetch2: async () => {
        const {data} = await httpService.get(todosEndepoint, {
            params: {
                _page: 1,
                _limit: 10,
            },
        });
        return data;
    },
    // fetch2: async () => {
    //     const {data} = await httpService.post(todosEndepoint2, {
    //         params: {
    //             title: "hello my title",
    //             completed: true,
    //         },
    //     });
    //     return data;
    // },
};
export default todosService;
