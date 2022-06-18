const MongoClient = require("mongodb").MongoClient;
const Staff = require("./staff")
const User = require("./user")



describe("Staff Info Management", () => {
    let client;
    beforeAll(async () => {
      client = await MongoClient.connect(
        "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.hi7lo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", //"my-mongodb+srv-connection-string",
        { useNewUrlParser: true },
      );
      Staff.injectDB(client);
      User.injectDB(client);
    })
  
    afterAll(async () => {
      await client.close();
    })
  
    test("New security registration",async () => {
      const res = await User.s_register("rocky", "9876", "gate A", "staff", "01978654")
      expect(res).toBe("new staff registered")
    })
  
  
    test("staff login successfully", async () => {
      const res = await Staff.login("jog", "4321")
      
      expect(res.staffusername).toBe("jog") 
      expect(res.position).toBe("gate E")
      expect(res.role).toBe("staff") 
      expect(res.staffphonenumber).toBe("01789654") 

    })
    
    test("User delete successfully", async () => {
      const res = await Staff.delete("rocky", "9876")
      expect(res).toBe("delete successfully")
    })
  

    
  
  });
  
 