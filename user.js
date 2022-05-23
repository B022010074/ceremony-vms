let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("arifdatabase").collection("staff")
	}

	/**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} username 
	 * @param {*} password 
	 * @param {*} name
	 * @param {*} staff_id
	 * @param {*} phonenumber 
	 */
	static async register(username, password, name, staff_id, phonenumber) {
		// TODO: Check if username exists
		return users.findOne({

			'username': username, 
			}).then(async user =>{
		   if (user) {
			if ( user.username == username )
			{
			return "username already existed"
			}
			//check staff number exist
			else if (user.staff_id==staff_id)
			{
			return "staff id already existed"
			}
		   }
		   else
		   {
			// TODO: Save user to database
			await users.insertOne({      
			   'username' : username,
			   'password' : password,
			   'name': name,
			   'staff id': staff_id,
			   'phone number': phonenumber,
			   
			   })
			  return "new staff registered"
			 }
			  }) 	
		   }
		   
	static async login(username, password) {
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
				  
				   return "login successful"
				   }
				}
			else
				{
				return "No such document"
				}
			})
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