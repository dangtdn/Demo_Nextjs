import workspaceServices from "../services/workspaceServices";

const { atom, selector } = require("recoil")

const defaultData = {
    arrProduct: [],
    select_ws: {
        workspace_name: 'Select workspace',
        workspace_id: '',
    }
};

const listWorkspaceState = atom({
    key: 'listWorkspace',
    default: defaultData.arrProduct,
});

export const newListWorkspaceState = selector({
    key: 'newListWorkspace',
    get: async ({get}) => {
        const list = get(listWorkspaceState);
        const workspace = await workspaceServices.getWorkspace();
        return [...list, workspace];
    }
});