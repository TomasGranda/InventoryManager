import { Item, ItemModel, ItemDocument } from '../models/Item';
import { Router, Request } from 'express';
import { itemIdParam } from '../config/consts';
import {
  InternalServerErrorResponse,
  BadRequestRespose,
  OkResponse,
} from '../models/Responses';
import { ItemTypeModel } from '../models/ItemType';

const itemsRouter = Router();

itemsRouter.get('/', async (_, res) => {
  let items: Item[];
  try {
    items = await ItemModel.find();
  } catch (err) {
    //TODO catch errors
    res.send(
      new InternalServerErrorResponse<unknown>(err, 'not catched error'),
    );
    return;
  }

  res.send(new OkResponse<Item[]>(items));
});

itemsRouter.get(`/:${itemIdParam}`, async (req, res) => {
  const itemId = req.params[itemIdParam];

  let item: Item;
  try {
    item = await ItemModel.findById(itemId);
  } catch (err) {
    //TODO catch errors
    res.send(
      new InternalServerErrorResponse<unknown>(err, 'not catched error'),
    );
    return;
  }

  res.send(new OkResponse(item));
});

itemsRouter.post('/save', async (req: Request<never, unknown, Item>, res) => {
  const itemTypeId = req.body.itemTypeId;

  if (!itemTypeId) {
    res.send(new BadRequestRespose('itemId is required'));
  }

  let itemType;
  try {
    itemType = await ItemTypeModel.findById(itemTypeId);
  } catch (err) {
    //TODO catch errors
    res.send(
      new InternalServerErrorResponse<unknown>(err, 'not catched error'),
    );
    return;
  }

  const newItem: Item = {
    itemType: itemType,
    amount: req.body.amount,
  };

  const itemModel = new ItemModel(newItem);

  try {
    await itemModel.validate();
  } catch (err) {
    res.send(new BadRequestRespose(err, 'Bad Request'));
    return;
  }

  let createdItem: Item;

  try {
    createdItem = await ItemModel.create(newItem);
  } catch (err) {
    //TODO catch errors
    res.send(
      new InternalServerErrorResponse<unknown>(err, 'not catched error'),
    );
    return;
  }

  res.send(new OkResponse<Item>(createdItem));
});

itemsRouter.put(
  `/setamount/:${itemIdParam}`,
  async (req: Request<never, unknown, Item>, res) => {
    const newItemAmount = req.body.amount;
    const itemId = req.params[itemIdParam];

    let item: ItemDocument;
    try {
      item = await ItemModel.findById(itemId);
      item.amount = newItemAmount;
      await item.validate();
    } catch (err) {
      //TODO catch errors
      res.send(
        new InternalServerErrorResponse<unknown>(err, 'not catched error'),
      );
      return;
    }

    try {
      item.save();
    } catch (err) {
      //TODO catch errors
      res.send(
        new InternalServerErrorResponse<unknown>(err, 'not catched error'),
      );
      return;
    }

    res.send(new OkResponse<Item>(item));
  },
);

export default itemsRouter;
