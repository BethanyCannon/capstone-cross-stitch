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
    const faveData = await knex("favourites").where({ user_id: id })
      .join("design", "favourites.design_id", "design.id")
      .join("creator", "design.creator_id", "creator.id")
      .select("design.id", "design_name", "creator.first_name", "creator.last_name")

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

  if (!req.file) {
    return res.status(400).send("Please add an avatar")
  }

  const { first_name, last_name, email, password, confirm_password, } = req.body;

 
  const image = req.file.filename

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

  if (!req.file) {
    return res.status(400).send("image error")
  }

  const hashedPassword = bcrypt.hashSync(password);

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
  const { Pid, Did } = req.params;

  const favourite = {
    user_id: Pid,
    design_id: Did,
  }

  try {
    await knex("favourites").insert(favourite);
    res.status(201).send("favourite added");
  } catch (error) {
    res.status(400).send("Failed registration");
  }
}

const deleteFavourite = async (req, res) => {
  const { Pid, Did } = req.params

  try {
    const deletefave = await knex("favourites").where({
      user_id: Pid,
      design_id: Did
    }).del()
    res.status(201).send("favourite deleted");
  } catch (error) {
    res.status(400).send(`Failed delete ${error}`);
  }
}

const editUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send("please make sure all inputs are filled out");
    }

    let { id, avatar, first_name, last_name, email, password, confirm_password } = req.body;

    if (!first_name || !last_name || !email || !password || !confirm_password) {
      return res.status(400).send("please ensure all inputs are filled");
    }

    const user = await knex("user").where({ id: req.params.id }).first();
    const hashPass = bcrypt.compareSync(password, user.password)
    let image = null;

    if (!hashPass) {
      if (password !== confirm_password) {
        return res.status(400).send("passwords do not match");
      }
      if (password !== "Password") {
      password = bcrypt.hashSync(password);
      } else {
       password = user.password
      }

    }
    if (req.file) {
      image = req.file.filename
    } else {
      image = avatar
    }

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

    const getEditedUser = await knex("user").where({ id: id }).first()
    delete getEditedUser.password;
    delete getEditedUser.created_at;

    res.status(200).json(getEditedUser);
  }
  catch (error) {
    res.status(400).send(`Patch error ${error}`);
  }


}

const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    await knex("user").where({ id: id })
      .del()
    res.status(201).send("User deleted");

  } catch (error) {
    res.status(400).send(`Failed user delete ${error}. Could not find user ${Pid}`);
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