interface iProduct {
    name: string;
    quantity: string;
}

interface iPurchaseList {
    id?: number;
    listName: string;
    data?: Array<iProduct>;
}

type purchaseListRequiredKeys = "listName" | "data";
type patchItemRequiredKeys = "name" | "quantity";

export {
    iProduct,
    iPurchaseList,
    purchaseListRequiredKeys,
    patchItemRequiredKeys,
};
