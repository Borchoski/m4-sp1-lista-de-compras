import { list } from "./db";
import {
    iPurchaseList,
    patchItemRequiredKeys,
    purchaseListRequiredKeys,
} from "./types";

const validateDataPostPurshaseList = (payload: any): iPurchaseList => {
    const keys: Array<string> = Object.keys(payload);
    const requiredKyes: Array<purchaseListRequiredKeys> = ["listName", "data"];
    const allRequired: boolean = requiredKyes.every((key: string) => {
        return keys.includes(key);
    });

    if (!allRequired) {
        throw new Error(`Required keys are: ${requiredKyes}`);
    }

    return payload;
};

const validateDataGetPurchaseListById = (payload: any) => {
    const productList = list.find((element) => element.id == payload);

    if (!productList) {
        throw new Error(`List not found`);
    }

    return productList;
};

const validateDataPatchItemOfPurchaseList = (payload: any) => {
    const keys: Array<string> = Object.keys(payload);

    const requiredKyes: Array<patchItemRequiredKeys> = ["name", "quantity"];
    const allRequired: boolean = requiredKyes.every((key: string) => {
        return keys.includes(key);
    });

    if (!allRequired) {
        throw new Error(`Required keys are: ${requiredKyes}`);
    }

    return payload;
};

export {
    validateDataPostPurshaseList,
    validateDataGetPurchaseListById,
    validateDataPatchItemOfPurchaseList,
};
