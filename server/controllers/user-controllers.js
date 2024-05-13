const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserData = async (req, res) => {

  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  // Parse the bearer token
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  if (authToken === null) {
    return res.status(401).send("Please login");
  }

  // Verify the token
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);

    // Respond with the appropriate user data
    const user = await knex("user").where({ id: decodedToken.id }).first();
    //delete unneccesary and sensitive data
    delete user.password;
    delete user.updated_at;

    res.send(user);

  } catch (error) {
    res.status(401).send("User data unauthorized");
  }
}

const getUserFavourites = async (req, res) => {
  const { id } = req.params

  try {
    //gets favourites that match user id
    const faveData = await knex("favourites").where({ user_id: id })
      .join("design", "favourites.design_id", "design.id")
      .join("creator", "design.creator_id", "creator.id")
      .select("design.id", "design_name", "creator.first_name", "creator.last_name")

    //map to got over each design object so that images go as one object to design
    const favouritesData = await Promise.all(faveData.map(async (fave) => {
      try {
        const image = await knex("images")
          .where("design_id", `${fave.id}`)

        const faveObj = {
          id: (fave.id),
          design_name: (fave.design_name),
          creator_name: (`${fave.first_name} ${fave.last_name}`),
          image: (image[0])
        }
        return (faveObj)

      } catch (error) {
        res.status(404).json({
          message: `Error retrieving designs: ${error}`
        })
      }
    })
    )
    res.status(200).json(favouritesData)
  } catch (error) {
    res.status(400).send(`could not find favourites: ${error}`)
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  // checks to make sure body is there
  if (!email || !password) {
    return res.status(404).send("Please enter the required fields");
  }

  // Find the user
  const user = await knex("user").where({ email: email }).first();
  if (!user) {
    return res.status(400).send("Invalid email");
  }

  // Validate the password
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).send("Invalid password");
  }

  // Generate a token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );

  res.send({ token });
}

const createNewUser = async (req, res) => {

  //check to see if image file is there
  if (!req.body) {
    return res.status(400).send("Please enter the required fields");
  }

  if (!req.file) {
    return res.status(400).send("Please add an avatar")
  }

  const { first_name, last_name, email, password, confirm_password, } = req.body;

  //set image to image filename
  const image = req.file.filename

  //checks: ensure body exists, ensuring passwords match, search to see if email already eists
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  if (confirm_password !== password) {
    return res.status(400).send("passwords do not match");
  }

  const user = await knex("user").where({ email: email }).first();
  if (user) {
    return res.status(400).send("this email is already in use");
  }

  const hashedPassword = bcrypt.hashSync(password);

  //create object with modified data
  const newUser = {
    first_name,
    last_name,
    email,
    password: hashedPassword,
    avatar: image,
  };

  // Insert it into database
  try {
    await knex("user").insert(newUser);
    res.status(201).send("Registered successfully");
  } catch (error) {
    res.status(400).send("Failed registration");
  }
}

const newFavourite = async (req, res) => {
  const { UserId, DesignId } = req.params;

  //favourite object
  const favourite = {
    user_id: UserId,
    design_id: DesignId,
  }

  //add to favourties database
  try {
    await knex("favourites").insert(favourite);
    res.status(201).send("favourite added");
  } catch (error) {
    res.status(400).send("Failed registration");
  }
}

const deleteFavourite = async (req, res) => {
  const { UserId, DesignId } = req.params

  try {
    //find item that matches ids
    await knex("favourites").where({
      user_id: UserId,
      design_id: DesignId
    }).del()
    //delete
    res.status(201).send("favourite deleted");
  } catch (error) {
    res.status(400).send(`Failed delete ${error}`);
  }
}

const editUser = async (req, res) => {
  try {

    let { id, avatar, first_name, last_name, email, password, confirm_password } = req.body;

    //check to make sure all values are filled out
    if (!first_name || !last_name || !email || !password || !confirm_password) {
      return res.status(400).send("please ensure all inputs are filled");
    }

    //get user data
    const user = await knex("user").where({ id: req.params.id }).first();
    //check to see it password matches current user password
    const hashPass = bcrypt.compareSync(password, user.password)

    //password check, if hashPass is flase
    if (!hashPass) {
      //check to see if passwords match
      if (password !== confirm_password) {
        return res.status(400).send("passwords do not match");
      }
      //if they do make sure password is non-placehold value and hash new password
      if (password !== "Password") {
        password = bcrypt.hashSync(password);
      } else {
      //if password if placehold vlaue set is as old pasword (not getting re-hashed)
        password = user.password
      }

    //set image variable to null
    let image = null;

    //check to see if new image has been added
    }
    if (req.file) {
      image = req.file.filename
    } else {
      //if not see image to old avatar filename
      image = avatar
    }

    //update user data
    await knex("user").where({ id: req.params.id }).first()
      .update(
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          avatar: image,
          updated_at: new Date(),
        })

    //get new user data and send as repsonse
    const getEditedUser = await knex("user").where({ id: id }).first()
    delete getEditedUser.password;
    delete getEditedUser.updated_at;

    res.status(200).json(getEditedUser);
  }
  catch (error) {
    res.status(400).send(`Patch error ${error}`);
  }


}

const deleteUser = async (req, res) => {
  const { id } = req.params

  //find user and delete
  try {
    await knex("user").where({ id: id })
      .del()
    res.status(201).send("User deleted");

  } catch (error) {
    res.status(400).send(`Failed user delete ${error}. Could not find user ${UserId}`);
  }
}

module.exports = {
  getUserData,
  getUserFavourites,
  loginUser,
  createNewUser,
  newFavourite,
  deleteFavourite,
  editUser,
  deleteUser,
}