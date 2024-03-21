const knex = require("knex")(require("../knexfile"));

const getDesignData = async (req, res) => {
    const designData = []
    try {
        const designsFound = await knex ("design")
            .join("creator", "design.creator_id", "creator.id")
            .join("images", "design.id", "images.design_id")
            .select('design.id', 'design.design_name', 'design.creator_id', 'creator.first_name', 'creator.last_name', 'images.image_url')
            designsFound.map((design) => {
                const designObj ={
                    id: (design.id),
                    design_name: (design.design_name),
                    creator_name: (design.first_name + " " + design.last_name),
                    image: [
                        design.image_url
                    ]
                    
                }
                return (designData.push(designObj))
            })

    } catch(error) {
        res.status(404).json({
            message: `Error retrieving designs: ${error}`,
          });
        }
    res.status(200).json(designData);
}

module.exports = {
    getDesignData
}