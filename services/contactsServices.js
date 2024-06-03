import Contact from "../schemas/contactsModel.js";
import { queryProjection } from "../schemas/contactsModel.js";

const count = (filter) => Contact.countDocuments(filter);

const getList = (filter, pagination) =>
  Contact.find(filter)
    .select(queryProjection)
    .skip(pagination.skip)
    .limit(pagination.limit);

const getById = (contactId, owner) =>
  Contact.findOne({ _id: contactId, owner }).select(queryProjection);

const remove = (contactId, owner) =>
  Contact.findOneAndDelete({ _id: contactId, owner }).select(queryProjection);

const add = (contactData) => Contact.create(contactData);

const update = (contactId, contactData, owner) =>
  Contact.findOneAndUpdate({ _id: contactId, owner }, contactData, {
    new: true,
  }).select(queryProjection);

export default {
  count,
  getList,
  getById,
  remove,
  add,
  update,
};
