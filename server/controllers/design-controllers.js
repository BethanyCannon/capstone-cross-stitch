const knex = require("knex")(require("../knexfile"));

const getDesignData = async (req, res) => {
    // const designData = []

    try {
        const designsFound = await knex("design").limit(15)
            .join("creator", "design.creator_id", "creator.id")
            .select('design.id', 'design.design_name', 'design.creator_id', 'creator.first_name', 'creator.last_name')

            const designData = await Promise.all(designsFound.map(async(design) => {
                try{
                    const image= await knex("images")
                    .where("design_id", `${design.id}`)

                    const designObj = {
                        id: (design.id),
                        design_name: (design.design_name),
                        creator_name: (design.first_name + " " + design.last_name),
                        image: (image[0])
                    }
                    return (designObj)
                } catch(error) {
                    res.status(404).json({
                        message: `Error retrieving designs: ${error}`,
                      })
                }
            })
            )
            res.status(200).json(designData);
    } catch(error) {
        res.status(404).json({
            message: `Error retrieving designs: ${error}`,
          });
        }
}

const designDetailsData = async (req, res) => {
    const {id} = req.params

    // const authHeader = req.headers.authorization;
    // const authToken = authHeader.split(" ")[1];
  
    // if (authToken === null) {
    //   return res.status(401).send("Please login");
    // }
  
    // // Verify the token
    //   const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
  
    //   // Respond with the appropriate user data
    //   const user = await knex("user").where({ id: decodedToken.id }).first();
    //   delete user.password;


    try{
        const designsFound = await knex("design").where({"design.id": id})
            .join("creator", "design.creator_id", "creator.id")
            .select("design.id", "design.thread_count", "design.height_size", "design.height_width", "design.description", "design.created_at", "design.design_name", "creator.first_name", "creator.last_name")

            const designData = await Promise.all(designsFound.map(async(design) => {
                try{
                    const image= await knex("images")
                    .where("design_id", `${design.id}`)

                    const designObj = {
                        id: (design.id),
                        thread_count: (design.thread_count),
                        height_size: (design.height_size),
                        height_width: (design.height_width),
                        description: (design.description),
                        created_at: (design.created_at),
                        design_name: (design.design_name),
                        creator_name: (design.first_name + " " + design.last_name),
                        image: (image)
                    }
                    return (designObj)
                } catch(error) {
                    res.status(404).json({
                        message: `Error retrieving designs: ${error}`,
                      })
                }
            })
            )
            res.status(200).json(designData);
    }catch(error){
        res.status(404).json({
            message: `Error retrieving designs: ${error}`,
          });
        }    
}

module.exports = {
    getDesignData,
    designDetailsData
}