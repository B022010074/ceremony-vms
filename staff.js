let staff;
let users;

class Staff{
    static async injectDB(conn) {
        staff = await conn.db("arifdatabase").collection("staff")    
	users = await conn.db("arifdatabase").collection("admin")
}
    /**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} staffusername 
	 * @param {*} staffpassword 
	 * @param {*} role
	 * @param {*} staffphonenumber 
	 */


static async login(staffusername,staffpassword){
  // TODO: Check if username exists
  const staf = await staff.findOne({ staffusername: staffusername })
  // TODO: Validate password
	  if (staf) {
	 
		  if(staf.staffpassword!=staffpassword){
			  return "invalid password"
			 }
		  else{
			
			 return staf;
			 }
		  }
	  else
		  {
		  return "No such document"
		  }
	  //})
}

  


	static async delete(staffusername, staffpassword) {
		// TODO: Check if username exists
		// return users.findOne({        
				
		// 	'staffusername': staffusername   
		// 	}).then(async sd =>{
		const sd = await staff.findOne({ staffusername: staffusername })		
		// TODO: Validate password
		if (sd) {
				
			if(sd.staffpassword!=staffpassword){
				return "invalid password"
			}
			else{
				await staff.deleteOne({staffusername:staffusername}) 
				return "delete successfully"
			}
		}
		else{
			return "Wrong username"
		}
		}
		//)}
}

module.exports = Staff;