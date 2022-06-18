let users;
let staff;

class User {
	static async injectDB(conn) {
		users = await conn.db("arifdatabase").collection("admin")
	staff = await conn.db("arifdatabase").collection("staff")
	}

	/**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} username 
	 * @param {*} password 
	 * @param {*} name
	 * @param {*} role
	 * @param {*} matric_id
	 * @param {*} phonenumber 
	 */
	static async register(username, password, name, role,matric_id, phonenumber) {
		// TODO: Check if username exists
		return users.findOne({

			'username': username, 
			}).then(async user =>{
		   if (user) {
			if ( user.username == username )
			{
			return "username already existed"
			}
			//check matric number exist
			else if (user.matric_id==matric_id)
			{
			return "matric id already existed"
			}
		   }
		   else
		   {
			// TODO: Save user to database
			await users.insertOne({      
			   'username' : username,
			   'password' : password,
			   'name': name,
			   'role': role,
			   'matric id': matric_id,
			   'phone number': phonenumber,
			   
			   })
			  return "new data registered"
			 }
			  }) 	
		   }
		
		   static async s_register(staffusername, staffpassword, position, staffphonenumber) {
			// TODO: Check if username exists
			return staff.findOne({
	
				'staffusername': staffusername, 
				}).then(async srg =>{
			   if (srg) {
				if ( srg.staffusername == staffusername )
				{
				return "staffusername already existed"
				}
				//check phone number exist
				else if (srg.staffphonenumber==staffphonenumber)
				{
				return "staff phone number already existed"
				}
			   }
			   else
			   {
				// TODO: Save user to database
				await staff.insertOne({      
				   'staffusername' : staffusername,
				   'staffpassword' : staffpassword,
				   'position': position,
				   'staffphonenumber': staffphonenumber,
				   
				   })
				  return "new staff registered"
				 }
				  }) 	
			   }	
		
			static async login(username, password) {
			// TODO: Check if username exists
				const user = await users.findOne({ username: username })
			// TODO: Validate password
				if (user) {
			   
					if(user.password!=password){
						return "invalid password"
					   }
					else{
					  
					   return user;
					   }
					}
				else
					{
					return "No such document"
					}
				//})
		}
	
	
		static async update(username, password, name) {
			// TODO: Check if username exists
			return users.findOne({        
			
				'username': username   
				}).then(async user =>{
		
			
				if (user) {
					if(user.password==password){
						await users.updateOne({username: username}, {"$set": { name: name}})
						return "Update successfully"
					}
					else if(user.password!==password){
						return "Invalid password"
					}
					}
				
				else{
					return "Invalid username"
				}
				})
		}
		
		
		static async delete(username, password) {
			// TODO: Check if username exists
			return users.findOne({        
					
				'username': username   
				}).then(async user =>{
					
			// TODO: Validate password
				if (user) {
					
					if(user.password!=password){
						return "invalid password"
					}
					else{
						await users.deleteOne({username:username}) 
						return "delete successfully"
					}
				}
				else{
					return "Wrong username"
				}
				})
		}

	
}
			   
module.exports = User;