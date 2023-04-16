// index.js
const { Command } = require('commander');
const program = new Command();
program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const db = require('./db/contacts');

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			const allContacts = await db.listContacts();
			console.log(allContacts);
			break;

		case 'get':
			const contact = await db.getContactById(id);
			console.log(contact);
			break;

		case 'add':
			const newContact = await db.addContact({ name, email, phone });
			console.log(newContact);
			break;

		case 'remove':
			const removeContact = await db.removeContact(id);
			console.log(removeContact);
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: 'AeHIrLTr6JkxGE6SN-0Rw' });
// invokeAction({
// 	action: 'add',
// 	name: 'Di',
// 	email: '123@gmail.com',
// 	phone: '+380675432212',
// });
invokeAction({ action: 'remove', id: '6XjvMs83cpPeQTsNEfq9L' });
invokeAction(argv);
