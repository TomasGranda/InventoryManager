import { Item, ItemModel, ItemDocument } from '../models/Item';
import { Router, Request } from 'express';
import { itemIdParam } from '../config/consts';
import {
  InternalServerErrorResponse,
  BadRequestRespose,
  OkResponse,
} from '../models/Responses';

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
  const newItem = req.body;
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
  `/rename/:${itemIdParam}`,
  async (req: Request<never, unknown, Item>, res) => {
    const newItemName = req.body.name;
    const itemId = req.params[itemIdParam];

    let item: ItemDocument;
    try {
      item = await ItemModel.findById(itemId);
      item.name = newItemName;
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
