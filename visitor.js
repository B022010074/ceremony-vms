let visitor;

class Visitor {
	static async injectDB(conn) {
		visitor = await conn.db("arifdatabase").collection("admin")
	
	}
    
	
	
    //find visitor
	static async viewvisitor(name){
        const exist= await visitor.findOne({"name" : name})
           if(exist){
             const user= await visitor.findOne(
               {"name" : name}
               ).then(result=>{ 
                 console.log(result)})
               return exist
           }
           else{
             return "Username cannot be found"
              }
      
			}
	
	
	//visitor update
	 static async updatephonenumber(username, password, phonenumber) {
		// TODO: Check if username exists
		return visitor.findOne({        
		 
			'username': username   
			}).then(async visit =>{
	   
		
			if (visit) {
				if(visit.password==password){
					await visitor.updateOne({username: username}, {"$set": { "phone number": phonenumber}})
					return "Update successfully"
				}
				else if(visit.password!==password){
					return "Invalid password"
				}
				}
			
			else{
				return "Invalid username"
			}
			})
	}
}	


module.exports = Visitor;