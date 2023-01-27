import express, { Application, json, query, Request, Response } from "express";
import { list } from "./db";
import {
    iProduct,
    iPurchaseList,
    patchItemRequiredKeys,
    purchaseListRequiredKeys,
} from "./types";
import {
    validateDataGetPurchaseListById,
    validateDataPatchItemOfPurchaseList,
    validateDataPostPurshaseList,
} from "./validate";
let id = 0;

const postPurshaseList = (req: Request, res: Response): Response => {
    try {
        const newPurchaseList: iPurchaseList = validateDataPostPurshaseList(
            req.body
        );

        const validName = list.find(
            (el) => el.listName == newPurchaseList.listName
        );
        if (validName) {
            return res.status(400).json({
                massege: "List name alredy exists",
            });
        }

        const isNumber = (str: any) => {
            return !isNaN(str);
        };

        if (isNumber(newPurchaseList.listName)) {
            return res.status(400).json({
                massege: "Cannot create a list with a invalid entry type",
            });
        }

        const validDataItens = newPurchaseList.data?.find(
            (el) => Object.keys(el).length > 2
        );
        if (validDataItens) {
            return res.status(400).json({
                massege: "Cannot create a list with a invalid entry",
            });
        }

        const data: iPurchaseList = {
            ...newPurchaseList,
            id,
        };
        id++;

        list.push(data);
        return res.status(201).json(data);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message,
            });
        }
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const getAllPurchaseList = (req: Request, res: Response): Response => {
    return res.status(201).json(list);
};

const getPurchaseListById = (req: Request, res: Response): Response => {
    try {
        const productList = validateDataGetPurchaseListById(+req.params.id);
        return res.status(201).json(productList);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message,
            });
        }
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const patchItemOfPurchaseList = (req: Request, res: Response): Response => {
    try {
        const { id, itemName } = req.params;
        const purchaseList = validateDataGetPurchaseListById(id);
        const response = validateDataPatchItemOfPurchaseList(req.body);

        let product = purchaseList.data?.find((el) => el.name == itemName);

        if (product == undefined) {
            return res.status(400).json({
                message: "Invalid item",
            });
        }

        let index = purchaseList.data?.findIndex(
            (el) => el.name == product?.name && el.quantity == product.quantity
        );

        product = {
            name: response.name,
            quantity: response.quantity,
        };

        purchaseList.data?.splice(index!, 1, product);

        return res.status(201).json(purchaseList);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({
                message: error.message,
            });
        }
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const deleteItemOfPurchaseList = (req: Request, res: Response) => {
    try {
        const { id, itemName } = req.params;
        const purchaseList = validateDataGetPurchaseListById(id);

        let product = purchaseList.data?.find((el) => el.name == itemName);
        let index = purchaseList.data?.findIndex(
            (el) => el.name == product?.name && el.quantity == product.quantity
        );

        if (index! < 0) {
            return res.status(404).json({
                massege: "Item not found",
            });
        }

        purchaseList.data?.splice(index!, 1);

        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({
                message: error.message,
            });
        }
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export {
    postPurshaseList,
    getAllPurchaseList,
    getPurchaseListById,
    patchItemOfPurchaseList,
    deleteItemOfPurchaseList,
};
