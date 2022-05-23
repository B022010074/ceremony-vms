const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.hi7lo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register("kassim", "4567","fitri","080","012345968")
		expect(res).toBe("new staff registered")
	})

	test("Duplicate username", async () => {
		const res = await User.register("crit", "1234")
		expect(res).toBe("username already existed")
	})

	test("User login invalid username", async () => {
		const res = await User.login("hadif", "4567")
		expect(res).toBe("No such document")
	})

	test("User login invalid password", async () => {
		const res = await User.login("crit", "4568")
		expect(res).toBe("invalid password") 
	})

	test("User login successfully", async () => {
		const res = await User.login("crit", "4567")
		expect(res).toBe("login successful")
	})

	test("User update wrong username", async () => {
		const res = await User.update("zeyro", "6789", "wahab")
		expect(res).toBe("Invalid username")
	})

    test("User update wrong password", async () => {
		const res = await User.update("zeyrox", "678", "wahab")
		expect(res).toBe("Invalid password")
	})
    
	test("User update successfully", async () => {
		const res = await User.update("zeyrox", "6789", "wahab")
		expect(res).toBe("Update successfully")
	})
    
	test("User delete failed, wrong username", async () => {
		const res = await User.delete("kassing", "4567")
		expect(res).toBe("Wrong username")
	})

    test("User delete failed, incorrects pass", async () => {
		const res = await User.delete("kassim", "3567")
		expect(res).toBe("invalid password")
	})
    
	test("User delete successfully", async () => {
		const res = await User.delete("kassim", "4567")
		expect(res).toBe("delete successfully")
	})
	
	
});