const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

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

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})

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
 *           application/text:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid username or password
 */

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
    else{
        return res.status(200).send("login successful!")
    }


})

app.post('/register', async (req, res) => {
	console.log(req.body);
	const user = await User.register(req.body.username, req.body.password,req.body.name,req.body.staff_id,req.body.phonenumber);
	if (user == "username already existed"||user == "staff id already existed"){
		return res.status(404).send("user duplicate!")		
	}

	return res.status(200).send("user successfully saved.")
})

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

app.delete('/delete/user', async (req, res) => {
	console.log(req.body);
	const user = await User.delete(req.body.username,req.body.password);
	if (user == "invalid password"){
		return res.status(404).send("Invalid password")		
	}
	else if(user == "Wrong username"){
		return res.status(404).send("Invalid username")
	}

	return res.status(200).send("Delete successfully")
})


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
