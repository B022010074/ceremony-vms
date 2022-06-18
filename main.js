const MongoClient = require("mongodb").MongoClient;
const User = require("./user");
const Visitor = require("./visitor");
const Staff = require("./staff");


MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.hi7lo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
	Visitor.injectDB(client)
	Staff.injectDB(client);
	
})

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'MyVMS API',
			version: '1.0.0',
		},
	},
	apis: ['./main.js'], // files containing annotations as above
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

// app.get('/hello', verifyToken, (req, res) => {
// 	console.log(req.user)
// 	res.send('Hello BENR2423')
// })


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *         username: 
 *           type: string
 *         phone: 
 *           type: string
 */

/**
 * @swagger
 * /login:
 *   post:
 *     description: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/text:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid username or password
 */

//user or admin login
app.post('/login', async (req, res) => {
	console.log(req.body);

	const user = await User.login(req.body.username, req.body.password);
	//console.log("Name: ",user.name)
	
	if (user == "invalid password"){
        return res.status(404).send("Wrong password")
    }
    else if(user == "No such document"){
        return res.status(404).send("Username not existed")
    }
    // else{
    //     return res.status(200).send("login successful!")
    // }

	res.status(200).json({
		_id: user._id,
		username: user.username,
		name: user.name,
		role: user.role,
		token: generateAccessToken({ 
			_id: user._id,
			username: user.username
			})
	});
})

// staff login
app.post('/login/staff', async (req, res) => {
	console.log(req.body);

	const staff = await Staff.login(req.body.staffusername, req.body.staffpassword);
	//console.log("Name: ",user.name)
	
	if (staff == "staff invalid password"){
        return res.status(404).send("Wrong password")
    }
    else if(staff == "No such document"){
        return res.status(404).send("staff not existed")
    }
   

	res.status(200).json({
		_id: staff._id,
		staffusername: staff.staffusername,
		role: staff.role,
		staffphonenumber: staff.staffphonenumber,
		token: generateAccessToken({ 
			_id: staff._id,
			staffusername: staff.staffusername
			})
		
	});
})

// user or admin register staff
app.post('/register/staff', async (req, res) => {
	console.log(req.body);
	const srg = await User.s_register(req.body.staffusername, req.body.staffpassword,req.body.role,req.body.staffphonenumber);
	if (srg == "staffusername already existed"||srg == "staff id already existed"){
		return res.status(404).send("staff duplicate!")		
	}

	return res.status(200).send("staff successfully saved.")
})

// user or admin register
app.post('/register', async (req, res) => {
	console.log(req.body);
	const user = await User.register(req.body.username, req.body.password,req.body.name,req.body.role,req.body.matric_id,req.body.phonenumber);
	if (user == "username already existed"||user == "staff id already existed"){
		return res.status(404).send("user duplicate!")		
	}

	return res.status(200).send("user successfully saved.")
})


// visitor find name
app.get('/find/visitor/:name', async(req,res)=>{
	const anyth= await Visitor.viewvisitor(req.params.name)
	if(anyth=="Username cannot be found")
	{
	  return res.status(404).send("Visitor not exist")
	}
	return res.status(200).json({
		_id: anyth._id,
		username: anyth.username,
		name: anyth.name,
		role: anyth.role,
	})
  })

// Middleware Express for JWT
//app.use(verifyToken);





  // visitor update phone no
  app.patch('/update/visitor',async (req,res) =>{
	console.log(req.body);

	let visit = await Visitor.updatephonenumber(req.body.username, req.body.password, req.body.phonenumber);
	if (visit == 'Invalid username'){
		return res.status(404).send("Invalid username")
	}

	else if (visit == 'Invalid password'){
		return res.status(404).send("Invalid password")
	}

	return res.status(200).send("Update successfully")

 })


  // user or admin update
  app.patch('/update/user',async (req,res) =>{
	console.log(req.body);

	let user = await User.update(req.body.username, req.body.password, req.body.name);
	if (user == 'Invalid username'){
		return res.status(404).send("Invalid username")
	}

	else if (user == 'Invalid password'){
		return res.status(404).send("Invalid password")
	}

	return res.status(200).send("Update successfully")
	
	//res.status(200).json({
	//	_id: user._id,
	//	name: user.username,
	//	phonenumber: user.phone,
	//})
})

// user or admin delete
app.delete('/delete/user', async (req, res) => {
	console.log(req.body);
	//if(req.user.role == "admin"){
	const user = await User.delete(req.body.username,req.body.password);
	if (user == "invalid password"){
		return res.status(404).send("Invalid password")		
	}
	else if(user == "Wrong username"){
		return res.status(404).send("Invalid username")
	}
	//}

	return res.status(200).send("Delete successfully")
})

// staff delete
app.delete('/delete/staff', async (req, res) => {
	console.log(req.body);
	//if(req.user.role == "admin"){
	const user = await User.delete(req.body.username,req.body.password);
	if (user == "invalid password"){
		return res.status(404).send("Invalid password")		
	}
	else if(user == "Wrong username"){
		return res.status(404).send("Invalid username")
	}
	//}

	return res.status(200).send("Delete successfully")
})



app.use(verifyToken);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

const jwt = require('jsonwebtoken');

function generateAccessToken(payload) {
	return jwt.sign(payload, "my-super-secret", { expiresIn: '60s' });
}

function verifyToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.sendStatus(401)

	jwt.verify(token, "my-super-secret", (err, user) => {
		console.log(err)

		if (err) return res.sendStatus(404)

		req.user = user

		next()
	})
}
