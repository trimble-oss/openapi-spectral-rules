module.exports = (input) => {

    const httpVerbs = ['get', 'post', 'put', 'delete', 'patch', 'trace', 'options', 'head', 'connect'];

    if (!httpVerbs.includes(input.toLowerCase())) {
        return [{
            message : `${input} is not a valid HTTP verb.`
        }]
      } 
    
}
