const MongoClient = require("mongodb").MongoClient;
const Visitor = require("./visitor")
const User = require("./user")

describe("Visitor Info Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.hi7lo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", //"my-mongodb+srv-connection-string",
			{ useNewUrlParser: true },
		);
		Visitor.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	
	test("Find visitor by name", async () => {
		const res = await Visitor.viewvisitor("arif")
    
		expect(res.username).toBe("some"),
		expect(res.role).toBe("visitor")
	})

	test("Visitor update successfully", async () => {
		const res = await Visitor.updatephonenumber("hello", "0987", "0123456")
		expect(res).toBe("Update successfully")
	})
});