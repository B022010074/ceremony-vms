const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Express Route Test', function () {
	
	let adminaccessToken;
	let staffaccessToken;
	

	beforeAll(async () => {
		const response1 = await request
			.post('/login')
			.send({username: "abu1", password: "6789" })
		adminaccessToken=response1.body.token;

		const response2 = await request
			.post('/login/staff')
			.send({username: "cools", password: "5678" })
		staffaccessToken=response2.body.token;

		
	});
	// it('should return hello world', async () => {
	// return request.get('/hello')
	// 	.expect(200)
	// 	.expect('Content-Type', /text/)
	// 	.then(res => {
	// 	expect(res.text).toBe('Hello BENR2423');
	// 	});
	//  })

	 it('register', async () => {
        return request
			.post('/register')
			.send({'username': 'abu1', 'password': "6789",'name':'samad','role': 'staff','matric_id':'070','phonenumber':'012345674' })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("user successfully saved.");
			});
	});

	it('register staff', async () => {
        return request
			.post('/register/staff')
			.send({'staffusername': 'arif', 'staffpassword': '1234' , 'position': 'gate C', 'staffphonenumber': '01223578' })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("staff successfully saved.");
			});
	});

	//register visitor
		// it('visitor register', async()=>{
		// 	return request
		// 		.post('/register/visitors')
		// 		.send({name:"Timo Werner",phonenumber:"01119692051",visitid:"10",block:"Satria",time:"5.00PM",date: "20/6/2022",tovisit:"Kai Havertz",Relationship:"Brother",reason:"Family visit",parking:"307B"})
		// 		.expect(200)
		// 		});
	
	it('register failed', async () => {
		return request
			.post('/register')
			.send({'username': 'abu1', 'password': "4567",'name':'alif','role': 'admin','matric_id':'050','phonenumber':'012345678' })
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("user duplicate!");
			});
	})
	

	

	it('login failed', async () => {
		return request
			.post('/login')
			.send({'username': "abu1", 'password': "4256" })
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("Wrong password");
			});
	})
	
	it('login successfully', async () => {
		return request
			.post('/login')
			.send({'username': "abu1", 'password': "6789" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						username: expect.any(String),
						name: expect.any(String),
						role: expect.any(String),
						token: expect.any(String)
						})		
				);
				// expect(response.body).toMatchObject({
				// 	_id: expect.any(String),
				// 	username: expect.any(String),
				// 	name: expect.any(String),
				// 	role: expect.any(String),
				// 	token: expect.any(String)
				// })
			});
	});
    
	it('login successfully', async () => {
		return request
			.post('/login/staff')
			//.set('Authorization', `Bearer ${staffaccessToken}`)
			.send({'staffusername': "aiman", 'staffpassword': "0123" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				// expect(response.body).toEqual(
				// 	expect.objectContaining({
				// 		_id:expect.any(String) ,
				// 		staffusername: expect.any(String),
				// 		role: expect.any(String),
				// 		staffphonenumber: expect.any(String)
				// 		})		
				// );
				expect(response.body).toMatchObject({
					_id:expect.any(String) ,
					staffusername: expect.any(String),
					position: expect.any(String),
					staffphonenumber: expect.any(String)
				})
			});
	});
	
	it('view visitor', async()=>{
		return request.get('/find/visitor/alif')
		.expect('Content-Type', /json/)
		.expect(200).then(response=>{
			expect(response.body).toMatchObject({
				_id: expect.any(String),
				username: expect.any(String),
				name: expect.any(String),
				role: expect.any(String),
			})
		  
		});
	  });
	// it('visitor test', async () => {
	// 	return request
	// 		.get('/visitor/username')
	// 		.set('Authorization', `Bearer ${accessToken}`)
	// 		.send({username: "ali"})
	// 		.expect('Content-Type', /json/)
	// 		.expect(200).then(response => {
	// 			expect(response.body).toEqual(
	// 				expect.objectContaining({
	// 					_id: expect.any(String),
	// 					username: expect.any(String),
	// 					phone: expect.any(Number),
	// 				})
	// 			);
	// 		});
			// .expect('Content-Type', /text/)
			// .expect(401).then(response => {
			// 	//expect(response.text).toEqual("Unauthorized");
			// 	expect(response.text).toEqual('user');
			// });
	//})
	
	// it('should return hello world', async () => {
	// 	return request.get('/hello')
	// 		.set('Authorization', `Bearer ${staffaccessToken}`)
	// 		.expect(200)
	// 		.expect('Content-Type', /text/)
	// 		.then(res => {
	// 		expect(res.text).toBe('Hello BENR2423');
	// 		});
	// 	 })
	

	it('update failed, wrong password', async () => {
		return request
			.patch('/update/user')
			.send({'username': 'abu1', 'password': '6783','name': 'samad' })
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	
	
	it('update failed, wrong username', async () => {
		return request
			.patch('/update/user')
			.send({'username': 'abu2', 'password': '6789','name': 'samad' })
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('update successfully', async () => {
		return request
			.patch('/update/user')
			.send({'username': 'abu1', 'password': '6789','name': 'samad' })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("Update successfully");
			});
	})
	
	//update visitor
	it('update successfully', async () => {
		return request
			.patch('/update/visitor')
			.send({'username': 'crit', 'password': '4567','phonenumber': '017892345' })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("Update successfully");
			});
	})
	
	it('delete failed, wrong username', async () => {
		return request
			.delete('/delete/user')
			.send({'username': 'abu2', 'password': '6789'})
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('delete failed, wrong password', async () => {
		return request
			.delete('/delete/user')
			.send({'username': 'abu1', 'password': '6783'})
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})


	// it('delete staff successfully', async () => {
	// 	return request
	// 		.delete('/delete/staff')
	// 		.send({'username': 'zeyrox', 'password': '3456'})
	// 		.expect('Content-Type', /text/)
	// 		.expect(200).then(response => {
	// 			expect(response.text).toEqual("Delete successfully");
	// 		});
	// })
	
	it('delete successfully', async () => {
		return request
			.delete('/delete/user')
			.send({'username': 'abu1', 'password': '6789'})
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("Delete successfully");
			});
	})
 
	

});