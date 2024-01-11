const Router = require("express")
const { createFact, getAllFacts, getFactsForOneUser, deleteFacts, editFacts, likeFact, dislikeFact } = require("../Controller/factController")

const routes = Router()



routes.post("/facts", createFact)
routes.get("/facts", getAllFacts)
routes.get("/facts/:userId", getFactsForOneUser)
routes.delete("/facts/:factId", deleteFacts)
routes.put("/facts/:factId", editFacts)
routes.post("/addLike/:factId/:userId", likeFact)
routes.post("/addDislike/:factId/:userId", dislikeFact)

module.exports = routes