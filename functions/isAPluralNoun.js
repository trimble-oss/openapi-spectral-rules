module.exports = (input) => {
	var pos = require('pos');
	var tagger = new pos.Tagger();
	var split_words = input.replace(/^\//,'').split(/\/{[-_a-z]{0,}}{0,}\/{0,}/).filter(function(e){return e}); 
	
	for (let i=0; i<split_words.length; i++)
	{
		var words = new pos.Lexer().lex(split_words[i]);
		var taggedWords = tagger.tag(words);
		const nounList = ['NN', 'NNS', 'NNP', 'NNPS'];
		
		if(i===0 && taggedWords[0][1] !== 'NNS'){
			return [{
				message : "The first root resource name in the URL MUST be a noun and MUST be in the plural form."
			}]
		}
		if(i!==0 && !nounList.includes(taggedWords[0][1])){
			return [{
				message : "The rest of root resource names in the URL should be a noun in plural or singular form."
			}]
		  }	
	}
}