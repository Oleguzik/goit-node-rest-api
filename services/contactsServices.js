import * as fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const contacts = await readFile();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readFile();
  const contact = contacts.find((item) => item.id === contactId);

  return contact ? contact : null;
}

async function removeContact(contactId) {
  const contacts = await readFile();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) return null;
  const contact = contacts.splice(index, 1)[0];
  await writeFile(contacts);

  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await readFile();
  const newContact = { id: nanoid(), name, email, phone };

  contacts.push(newContact);
  await writeFile(contacts);

  return newContact;
}

async function updateContact(id, updatedData) {
  const contacts = await readFile();
  const index = contacts.findIndex((item) => item.id === id);

  if (index === -1) return null;

  const updContact = { ...contacts[index], ...updatedData };
  contacts[index] = updContact;

  await writeFile(contacts);

  return updContact;
}

async function readFile() {
  const data = await fs.readFile(contactPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function writeFile(contacts) {
  return fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
