const { factmodel } = require("../database/schema/factSchema")

const createFact = async (req, res) => {
    const fact = req.body

    try {
        await factmodel.create(fact);
        const theFact = await factmodel.findOne({ title: fact.title, fact: fact.fact })
        res.status(200).send(theFact)
    } catch (err) {
        res.status(500).send("Server error")
    }
}

const getFactsForOneUser = async (req, res) => {
    const UserId = req.params.userId
    try {
        const Fact = await factmodel.find({ userId: UserId })

        if (Fact) {
            res.status(200).send(Fact)
        } else {
            res.status(403).send("Couldn't find the Account")
        }

    } catch (err) {
        console.log(err)
    }

}
const getAllFacts = async (req, res) => {

    try {
        const facts = await factmodel.find()
        res.status(200).send(facts)
    } catch (err) {
        res.status(500).send("Server error")
    }
}

const deleteFacts = async (req, res) => {
    const factId = req.params.factId
    try {
        const fact = await factmodel.findByIdAndDelete(factId)
        if (fact) {
            res.status(200).send(fact.id)
        } else {
            res.status(404).send("Couldn't find the fact")
        }
    } catch (err) {
        res.status(500).send("Server error")
    }
}

const editFacts = async (req, res) => {
    const body = req.body
    const factId = req.params.factId
    try {
        await factmodel.findByIdAndUpdate(factId, { title: body.title, fact: body.fact })
        const uptadedFact = await factmodel.findOne({ _id: factId })
        res.status(200).send(uptadedFact)
    } catch (err) {
        res.status(500).send("Server Error")
    }
}

const likeFact = async (req, res) => {

    const factId = req.params.factId
    const userId = req.params.userId
    try {
        const fact = await factmodel.findById(factId)
        const updateddislike = fact.dislike.filter(id => id !== userId)
        console.log('here', updateddislike)
        const isAlreadyLiked = fact.like.includes(userId)
        const updatedlike = isAlreadyLiked ? fact.like : [...fact.like, userId]
        const uptadeFact = await factmodel.findByIdAndUpdate(factId, {
            like: updatedlike,
            dislike: updateddislike
        }, { new: true })

        res.status(200).send(uptadeFact)
    } catch (err) {
        res.status(500).send("Server Error")
    }
}

const dislikeFact = async (req, res) => {

    const factId = req.params.factId
    const userId = req.params.userId
    try {
        const fact = await factmodel.findById(factId)
        const updatedlike = fact.like.filter((id) => id !== userId)

        const isAlreadydisliked = fact.dislike.includes(userId)
        const uptadedislike = isAlreadydisliked ? fact.dislike : [...fact.dislike, userId]

        const uptadedFact = await factmodel.findByIdAndUpdate(factId, {
            like: updatedlike,
            dislike: uptadedislike
        }, { new: true })
        res.status(200).send(uptadedFact)
    } catch (err) {
        res.status(500).send("Server Error")
    }
}

module.exports = { createFact, getAllFacts, getFactsForOneUser, deleteFacts, editFacts, likeFact, dislikeFact }