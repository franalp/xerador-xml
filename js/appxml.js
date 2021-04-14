'use strict';

+function() {
	var validTags = [
		'b', 'i', 'u', 'ul', 'ol', 'li', 'pre', 'strike', 'sub', 'sup',
		'span', 'span\\s+style\\s*=\\s*(&quot;|&apos;)(?:(?!\\1).)*\\1', // <span style="...">
		'div', 'div\\s+style\\s*=\\s*(&quot;|&apos;)(?:(?!\\1).)*\\1', // <div style="...">
		'hr\\s*/?', // <hr/>
		'br\\s*/?', // <br/>
		'font', 'font\\s+color\\s*=\\s*(&quot;|&apos;)(?:(?!\\1).)*\\1' // <font color="red">
	].map(function(tag) {
		return new RegExp('&lt;/?' + tag + '&gt;', 'ig');
	});

	String.prototype.escapeHTML = function(keepFormatting) {
		var output = he.encode(this, { useNamedReferences : true });

		if (keepFormatting) {
			for (var i = 0; i < validTags.length; i++) {
				var reTag = validTags[i], match;
				while (match = reTag.exec(output)) {
					var tag = match[0];
					tag = '<' + tag.slice(4, tag.length-4).replace(/&quot;/g, '"').replace(/&apos;/g, "'") + '>';
					output = output.slice(0, match.index) + tag + output.slice(match.index + match[0].length);
					reTag.lastIndex -= match[0].length - tag.length;
				}
			}
		}

		return output.replace(/&amp;(\w+);/g, function($0, $1) { return '&'+$1+';'; });
	};
}();

// Crear funcion de número aleatoria

function aleatorio(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

// Establecer variables feedback aleatorias

var feedregular = feedreg[aleatorio(0, feedreg.length)];

var feednegativo = feedneg[aleatorio(0, feedneg.length)];

var feedpositivo = feedpos[aleatorio(0, feedpos.length)];

// Escribir en body

function escribir(cont,contido){
document.getElementById(cont).innerHTML=contido;
}


function Question(type, title, text, options) {
	this.type = type || 'single';
	this.title = title || '';
	this.text = text || '';
	this.options = options || (options = []);

	var self = this;
	this.remove = function() {
		vm.questions.splice(vm.questions.indexOf(self), 1);
	};

	this.addOption = function() {
		options.push(new Option(self));
		options.posicion += 1;
	};

	Object.defineProperties(this, {
		showOptions : {
			get : function() {
				return this.type === 'multi' || this.type === 'single';
			}
		},
		showOptionsShort : {
			get : function() {
				return this.type === 'short';
			}
		},
		showOptionsMatch : {
			get : function() {
				return this.type === 'match';
			}
		},
		showOptionsOrder : {
			get : function() {
				return this.type === 'orderv' || this.type === 'orderh';
			}
		},
	});
}
Question.prototype.toString = function() {
    var outtitle = '';
    var outtext = '';
	if (this.title) outtitle += this.title;
	if (this.text) outtext += this.text.escapeHTML(true);
    var outfalse = '\t<question type="truefalse">\n\t\t<name>\n\t\t\t<text><![CDATA[<p>' + outtitle + '</p>]]></text>\n\t\t</name>\n\t\t<questiontext format="html">\n\t\t\t<text><![CDATA[<p>' + outtext + '</p>]]></text>\n\t\t</questiontext>\n\t\t<generalfeedback format="html">\n\t\t\t<text></text>\n\t\t</generalfeedback>\n\t\t<defaultgrade>1.0000000</defaultgrade>\n\t\t<penalty>0.3333333</penalty>\n\t\t<hidden>0</hidden>\n\t\t<answer fraction="0" format="moodle_auto_format">\n\t\t\t<text>true</text>\n\t\t\t<feedback format="html">\n\t\t\t\t<text><![CDATA[<p>' + feednegativo + '</p>]]></text>\n\t\t\t</feedback>\n\t\t</answer>\nt\t<answer fraction="100" format="moodle_auto_format">\n\t\t\t<text>false</text>\n\t\t\t<feedback format="html">\n\t\t\t\t<text>¡Correcto!</text>\n\t\t\t</feedback>\n\t\t</answer>\n\t</question>\n';
    var outtrue = '\t<question type="truefalse">\n\t\t<name>\n\t\t\t<text><![CDATA[<p>' + outtitle + '</p>]]></text>\n\t\t</name>\n\t\t<questiontext format="html">\n\t\t\t<text><![CDATA[<p>' + outtext + '</p>]]></text>\n\t\t</questiontext>\n\t\t<generalfeedback format="html">\n\t\t\t<text></text>\n\t\t</generalfeedback>\n\t\t<defaultgrade>1.0000000</defaultgrade>\n\t\t<penalty>0.3333333</penalty>\n\t\t<hidden>0</hidden>\n\t\t<answer fraction="100" format="moodle_auto_format">\n\t\t\t<text>true</text>\n\t\t\t<feedback format="html">\n\t\t\t\t<text><![CDATA[<p>' + feedpositivo + '</p>]]></text>\n\t\t\t</feedback>\n\t\t</answer>\n\t\t<answer fraction="0" format="moodle_auto_format">\n\t\t\t<text>false</text>\n\t\t\t<feedback format="html">\n\t\t\t\t<text>¡Debes fixarte ben!</text>\n\t\t\t</feedback>\n\t\t</answer>\n\t</question>\n';
    var outshort = '\t<question type="shortanswer">\n\t\t<name>\n\t\t\t<text><![CDATA[<p>' + outtitle + '</p>]]></text>\n\t\t</name>\n\t\t<questiontext format="html">\n\t\t\t<text><![CDATA[<p>' + outtext + '</p>]]></text>\n\t\t</questiontext>\n\t\t<generalfeedback format="html">\n\t\t\t<text></text>\n\t\t</generalfeedback>\n\t\t<defaultgrade>1.0000000</defaultgrade>\n\t\t<penalty>0.3333333</penalty>\n\t\t<hidden>0</hidden>\n\t\t<usecase>0</usecase>\n';
    var outlong = '\t<question type="essay">\n\t\t<name>\n\t\t\t<text><![CDATA[<p>' + outtitle + '</p>]]></text>\n\t\t</name>\n\t\t<questiontext format="html">\n\t\t\t<text><![CDATA[<p>' + outtext + '</p>]]></text>\n\t\t</questiontext>\n\t\t<generalfeedback format="html">\n\t\t\t<text></text>\n\t\t</generalfeedback>\n\t\t<defaultgrade>1.0000000</defaultgrade>\n\t\t<penalty>0.0000000</penalty>\n\t\t<hidden>0</hidden>\n\t\t<responseformat>editor</responseformat>\n\t\t<responserequired>1</responserequired>\n\t\t<responsefieldlines>15</responsefieldlines>\n\t\t<attachments>0</attachments>\n\t\t<attachmentsrequired>0</attachmentsrequired>\n\t\t<graderinfo format="html">\n\t\t\t<text></text>\n\t\t</graderinfo>\n\t\t<responsetemplate format="html">\n\t\t\t<text></text>\n\t\t</responsetemplate>\n\t</question>\n';
    var outmulti = '\t<question type="multichoice">\n\t\t<name>\n\t\t\t<text><![CDATA[<p>' + outtitle + '</p>]]></text>\n\t\t</name>\n\t\t<questiontext format="html">\n\t\t\t<text><![CDATA[<p>' + outtext + '</p>]]></text>\n\t\t</questiontext>\n\t\t<generalfeedback format="html">\n\t\t\t<text></text>\n\t\t</generalfeedback>\n\t\t<defaultgrade>1.0000000</defaultgrade>\n\t\t<penalty>0.3333333</penalty>\n\t\t<hidden>0</hidden>\n\t\t<single>false</single>\n\t\t<shuffleanswers>true</shuffleanswers>\n\t\t<answernumbering>abc</answernumbering>\n\t\t<correctfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feedpositivo + '</p>]]></text>\n\t\t</correctfeedback>\n\t\t<partiallycorrectfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feedregular + '</p>]]></text>\n\t\t</partiallycorrectfeedback>\n\t\t<incorrectfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feednegativo + '</p>]]></text>\n\t\t</incorrectfeedback>\n\t\t<shownumcorrect/>\n';
    var outsingle = '\t<question type="multichoice">\n\t\t<name>\n\t\t\t<text><![CDATA[<p>' + outtitle + '</p>]]></text>\n\t\t</name>\n\t\t<questiontext format="html">\n\t\t\t<text><![CDATA[<p>' + outtext + '</p>]]></text>\n\t\t</questiontext>\n\t\t<generalfeedback format="html">\n\t\t\t<text></text>\n\t\t</generalfeedback>\n\t\t<defaultgrade>1.0000000</defaultgrade>\n\t\t<penalty>0.3333333</penalty>\n\t\t<hidden>0</hidden>\n\t\t<single>true</single>\n\t\t<shuffleanswers>true</shuffleanswers>\n\t\t<answernumbering>abc</answernumbering>\n\t\t<correctfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feedpositivo + '</p>]]></text>\n\t\t</correctfeedback>\n\t\t<partiallycorrectfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feedregular + '</p>]]></text>\n\t\t</partiallycorrectfeedback>\n\t\t<incorrectfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feednegativo + '</p>]]></text>\n\t\t</incorrectfeedback>\n\t\t<shownumcorrect/>\n';
    var outmatch = '\t<question type="matching">\n\t\t<name>\n\t\t\t<text><![CDATA[<p>' + outtitle + '</p>]]></text>\n\t\t</name>\n\t\t<questiontext format="html">\n\t\t\t<text><![CDATA[<p>' + outtext + '</p>]]></text>\n\t\t</questiontext>\n\t\t<generalfeedback format="html">\n\t\t\t<text></text>\n\t\t</generalfeedback>\n\t\t<defaultgrade>1.0000000</defaultgrade>\n\t\t<penalty>0.3333333</penalty>\n\t\t<hidden>0</hidden>\n\t\t<shuffleanswers>true</shuffleanswers>\n\t\t<correctfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feedpositivo + '</p>]]></text>\n\t\t</correctfeedback>\n\t\t<partiallycorrectfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feedregular + '</p>]]></text>\n\t\t</partiallycorrectfeedback>\n\t\t<incorrectfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feednegativo + '</p>]]></text>\n\t\t</incorrectfeedback>\n\t\t<shownumcorrect/>\n';
    var outorderv = '\t<question type="ordering">\n\t\t<name>\n\t\t\t<text><![CDATA[<p>' + outtitle + '</p>]]></text>\n\t\t</name>\n\t\t<questiontext format="html">\n\t\t\t<text><![CDATA[<p>' + outtext + '</p>]]></text>\n\t\t</questiontext>\n\t\t<generalfeedback format="html">\n\t\t\t<text></text>\n\t\t</generalfeedback>\n\t\t<defaultgrade>1.0000000</defaultgrade>\n\t\t<penalty>0.3333333</penalty>\n\t\t<hidden>0</hidden>\n\t\t<layouttype>VERTICAL</layouttype>\n\t\t<selecttype>ALL</selecttype>\n\t\t<selectcount>0</selectcount>\n\t\t<gradingtype>ABSOLUTE_POSITION</gradingtype>\n\t\t<showgrading>HIDE</showgrading>\n\t\t<numberingstyle>none</numberingstyle>\n\t\t<correctfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feedpositivo + '</p>]]></text>\n\t\t</correctfeedback>\n\t\t<partiallycorrectfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feedregular + '</p>]]></text>\n\t\t</partiallycorrectfeedback>\n\t\t<incorrectfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feednegativo + '</p>]]></text>\n\t\t</incorrectfeedback>\n';
    var outorderh = '\t<question type="ordering">\n\t\t<name>\n\t\t\t<text><![CDATA[<p>' + outtitle + '</p>]]></text>\n\t\t</name>\n\t\t<questiontext format="html">\n\t\t\t<text><![CDATA[<p>' + outtext + '</p>]]></text>\n\t\t</questiontext>\n\t\t<generalfeedback format="html">\n\t\t\t<text></text>\n\t\t</generalfeedback>\n\t\t<defaultgrade>1.0000000</defaultgrade>\n\t\t<penalty>0.3333333</penalty>\n\t\t<hidden>0</hidden>\n\t\t<layouttype>HORIZONTAL</layouttype>\n\t\t<selecttype>ALL</selecttype>\n\t\t<selectcount>0</selectcount>\n\t\t<gradingtype>ABSOLUTE_POSITION</gradingtype>\n\t\t<showgrading>HIDE</showgrading>\n\t\t<numberingstyle>none</numberingstyle>\n\t\t<correctfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feedpositivo + '</p>]]></text>\n\t\t</correctfeedback>\n\t\t<partiallycorrectfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feedregular + '</p>]]></text>\n\t\t</partiallycorrectfeedback>\n\t\t<incorrectfeedback format="html">\n\t\t\t<text><![CDATA[<p>' + feednegativo + '</p>]]></text>\n\t\t</incorrectfeedback>\n';
    var outfin = '\t</question>\n';
	switch (this.type) { // Establecer encabezados e respostas posibles 'options'
		case 'true':
			return outtrue;
		case 'false':
			return outfalse; 
		case 'short':
			return outshort + shortOptions(this.options) + outfin; 
		case 'long':
			return outlong;
		case 'multi':
			return outmulti + multiOptions(this.options) + outfin;
		case 'single':
			return outsingle + singleOptions(this.options) + outfin;
		case 'match':
			return outmatch + matchOptions(this.options) + outfin;
		case 'orderv':
			return outorderv + orderOptionsV(this.options) + outfin;
		case 'orderh':
			return outorderh + orderOptionsH(this.options) + outfin;
	}
};

function matchOptions(options) {
	return options.map(function(opt) {
		var text = opt.text.replace(/([~=#{}])/g, '\\$1').escapeHTML(true);
		var text2 = opt.text2.replace(/([~=#{}])/g, '\\$1').escapeHTML(true);
        var textfull = '\t\t<subquestion format="html">\n\t\t\t<text><![CDATA[<p>' + text + '</p>]]></text>\n\t\t\t<answer>\n\t\t\t\t<text><![CDATA[<p>' + text2 + '</p>]]></text>\n\t\t\t</answer>\n\t\t</subquestion>\n';
        return textfull;
	}).join('\n') + '\n';
}

function shortOptions(options) {
	return options.map(function(opt) {
		var text = opt.text.replace(/([~=#{}])/g, '\\$1').escapeHTML(true);
        var textfull = '\t\t<answer fraction="100" format="moodle_auto_format">\n\t\t\t<text><![CDATA[<p>' + text + '</p>]]></text>\n\t\t\t<feedback format="html">\n\t\t\t\t<text></text>\n\t\t\t</feedback>' + '\n\t\t</answer>\n';
        return textfull;
	}).join('\n') + '\n';
}

function orderOptionsV(options) {
	return options.map(function(opt) {
		var text = opt.text.replace(/([~=#{}])/g, '\\$1').escapeHTML(true);
    var fraction = opt.pos.toFixed(7);
		var textfull = '\t\t<answer fraction="' + fraction + '" format="moodle_auto_format">\n\t\t\t<text><![CDATA[<p>' + text + '</p>]]></text>\n\t\t</answer>\n';
		return textfull;
	}).join('\n') + '\n';
}

function orderOptionsH(options) {
	return options.map(function(opt) {
		var text = opt.text.replace(/([~=#{}])/g, '\\$1').escapeHTML(true);
		var fraction = opt.pos.toFixed(7);
		var textfull = '\t\t<answer fraction="' + fraction + '" format="moodle_auto_format">\n\t\t\t<text><![CDATA[<p>' + text + '</p>]]></text>\n\t\t</answer>\n';
		return textfull;
	}).join('\n') + '\n';
	}

function multiOptions(options) {
	var total = options.map(function(opt) { if (opt.value >= 0) {return opt.value;} else {return 0;} })
			.reduce(function(sum, val) { return sum + val; });
//	var total = options.map(function(opt) { return opt.value; })
//			.reduce(function(sum, val) { return sum + val; });
	var empty = options.reduce(function(empty, opt) { return empty + (opt.value?0:1); }, 0);

	var defaultValue = 0 / empty;

	return options.map(function(opt) {
		if (opt.value >= 0) {
		    var value = opt.value ? opt.value / total * 100 : defaultValue;
		} else {
		    var value = opt.value;
		}
		var fraction = value.toFixed(5);
		var resposta = opt.text.replace(/([~=#{}])/g, '\\$1').escapeHTML(true);
		var textfull = '\t\t<answer fraction="' + fraction + '" format="html">\n\t\t\t<text><![CDATA[<p>' + resposta + '</p>]]></text>\n\t\t\t<feedback format="html">\n\t\t\t\t<text></text>\n\t\t\t</feedback>\n\t\t</answer>\n';
		return textfull;
	}).join('\n') + '\n';
}
function singleOptions(options) {
	var max = options.map(function(opt) { return opt.value; })
			.reduce(function(max, val) { if (val > max) return val; else return max; });

	return '\n' + options.map(function(opt) {
		var resposta = opt.text.replace(/([~=#{}])/g, '\\$1').escapeHTML(true);
		var valorcorrixido = max;
		if (opt.value === max) {valorcorrixido = 100;} else {valorcorrixido = opt.value;}
		var fraction = valorcorrixido.toFixed(5);
		var textfull = '\t\t<answer fraction="' + fraction + '" format="html">\n\t\t\t<text><![CDATA[<p>' + resposta + '</p>]]></text>\n\t\t\t<feedback format="html">\n\t\t\t\t<text></text>\n\t\t\t</feedback>\n\t\t</answer>\n';
		return textfull;
	}).join('\n') + '\n';
}

function Rule(code, description, fn) {
	fn.code = code;
	fn.description = description;
	return fn;
}

function Option(question, value, text, text2, pos, control) {
	this.value = value || 0;
	this.control = control || 0;
	this.text = text || "";
	this.text2 = text2 || "";
	this.pos = value || 1;

    if (control < 0) {
        control = 0;
    } else {
        control = value;
    }

	Object.defineProperties(this, {
		valid : {
			get : function() {
				return !isNaN(this.value);
			}
		}
	});

	var self = this;
	this.remove = function() {
		question.options.splice(question.options.indexOf(self), 1);
	};
}

function QuestionType(type, text) {
	this.type = type;
	this.text = text;
}

var vm = new Vue({
	el : '#app',
	data : {
		questions : [],
		questionTypes : [
			new QuestionType("single", capalang[23]),
			new QuestionType("multi", capalang[24]),
			new QuestionType("true", capalang[25]),
			new QuestionType("false", capalang[26]),
			new QuestionType("short", capalang[27]),
			new QuestionType("long", capalang[28]),
			new QuestionType("match", capalang[29]),
			new QuestionType("orderv", capalang[30]),
			new QuestionType("orderh", capalang[31]),
  	]
	},
	methods : {
		addQuestion : function() {
			this.questions.push(new Question());
		},
		build : 
			// engadido principio do documento
		    function() {
				var xmli = '<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n';
				var xmlf = '\n</quiz>';
				var xml = this.questions.map(function(question) {
				return question.toString();
			})
			.join('\n\n');
            // fin do documento
			// download
			var dl = document.createElement('a');
			var date = Date.now();
			dl.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(xmli + xml + xmlf);
			dl.download = 'test_moodle' + date + '.xml';

			if (document.createElement) {
				var event = document.createEvent('MouseEvents');
				event.initEvent('click', true, true);
				dl.dispatchEvent(event);
			} else {
				dl.click();
			}
		}
	}
});
