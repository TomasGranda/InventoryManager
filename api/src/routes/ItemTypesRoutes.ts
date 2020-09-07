import { Router, Request } from 'express';
import { itemTypeIdParam } from '../config/consts';
import {
  InternalServerErrorResponse,
  BadRequestRespose,
  OkResponse,
} from '../models/Responses';
import { ItemType, ItemTypeModel, ItemTypeDocument } from '../models/ItemType';

const itemTypesRouter = Router();

itemTypesRouter.get('/', async (_, res) => {
  let itemTypes: ItemType[];
  try {
    itemTypes = await ItemTypeModel.find();
  } catch (err) {
    //TODO catch errors
    res.send(
      new InternalServerErrorResponse<unknown>(err, 'not catched error'),
    );
    return;
  }

  res.send(new OkResponse<ItemType[]>(itemTypes));
});

itemTypesRouter.get(`/:${itemTypeIdParam}`, async (req, res) => {
  const itemTypeId = req.params[itemTypeIdParam];

  let itemType: ItemType;
  try {
    itemType = await ItemTypeModel.findById(itemTypeId);
  } catch (err) {
    //TODO catch errors
    res.send(
      new InternalServerErrorResponse<unknown>(err, 'not catched error'),
    );
    return;
  }

  res.send(new OkResponse(itemType));
});

itemTypesRouter.post(
  '/save',
  async (req: Request<never, unknown, ItemType>, res) => {
    const newItemType = req.body;
    const itemTypeModel = new ItemTypeModel(newItemType);

    try {
      await itemTypeModel.validate();
    } catch (err) {
      res.send(new BadRequestRespose(err, 'Bad Request'));
      return;
    }

    let createdItemType: ItemType;

    try {
      createdItemType = await ItemTypeModel.create(newItemType);
    } catch (err) {
      //TODO catch errors
      res.send(
        new InternalServerErrorResponse<unknown>(err, 'not catched error'),
      );
      return;
    }

    res.send(new OkResponse<ItemType>(createdItemType));
  },
);

itemTypesRouter.put(
  `/rename/:${itemTypeIdParam}`,
  async (req: Request<never, unknown, ItemType>, res) => {
    const newItemTypeName = req.body.name;
    const itemTypeId = req.params[itemTypeIdParam];

    let itemType: ItemTypeDocument;
    try {
      itemType = await ItemTypeModel.findById(itemTypeId);
      itemType.name = newItemTypeName;
    } catch (err) {
      //TODO catch errors
      res.send(
        new InternalServerErrorResponse<unknown>(err, 'not catched error'),
      );
      return;
    }

    try {
      itemType.save();
    } catch (err) {
      //TODO catch errors
      res.send(
        new InternalServerErrorResponse<unknown>(err, 'not catched error'),
      );
      return;
    }

    res.send(new OkResponse<ItemType>(itemType));
  },
);

export default itemTypesRouter;
