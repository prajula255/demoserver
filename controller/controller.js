exports.firstget = async (request, response) => {
    console.log(request)
    response.send("hii express")

}

exports.firstpost = async (request, response) => {
    const { name, age } = request.body
    response.send(`my name is ${name} and ${age}`)

}