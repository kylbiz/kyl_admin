var querystring = Meteor.npmRequire('querystring')
var requestUrl = 'http://192.168.0.100/docgen/';


function log(info) {
  var len = arguments.length;
  console.log('------------------------------------')
  for(var i = 0; i < len; i++) {
    console.log(arguments[i]);
  }
};


Meteor.methods({
	"GenerateCheTemplate": function(options) {
		log("GenerateCheTemplate: Hi, I am called!");
		if(!options 
			|| !options.hasOwnProperty("orderId")
			|| !options.hasOwnProperty("uuid") 
			|| !options.hasOwnProperty("zone")) {
			log("GenerateCheTemplate: options illegal", options);
		} else {
			var orderId = options.orderId;
			var uuid = options.uuid;
			var zone = options.zone;

			var companyZipcode = '200082';
			switch(zone) {
		    case '虹口':
	      	companyZipcode = '200082';
	      break;
	    case '浦东':
	        companyZipcode = '201204';
	      break;
	    default: 
	        companyZipcode = '200082';
	      break;	
			}

			var order = Orders.findOne({orderId: orderId});

			if(!order) {
				log("GenerateTemplate: query order error");
			} else {
				var requests = HandleCheckOrder(order);

			  requests.forEach(function(request) {
			    var fileName = request.fileName;
			    var cnLabel = request.cnLabel;
			    var randomStr = uuid;
			    delete request.fileName;
			    delete request.cnLabel;
			    fileData = JSON.stringify(request);

			    var params = {
			      fileName: fileName,
			      cnLabel: cnLabel,
			      randomStr: randomStr,
			      fileData: fileData
			    }
			    log(params)

			    HTTP.call('POST',requestUrl, {
			      params: params
			    }, function(err, result) {
			      if(!err && querystring.parse(result.content).result === 'success') {
			        var handleFlag = 'true';          
			        var resultString = querystring.parse(result.content).resultString;

			        log('resultString: ', resultString);

			        HandleResults.insert({
			          uuid: uuid,
			          handleFlag: handleFlag,
			          wordURI: requestUrl+ 'output/' + resultString + '.doc',
			          pdfURI: requestUrl+ 'output/' + resultString + '.pdf',
			          fileName: fileName,
			          cnLabel: cnLabel,
			          createDate: new Date()
			        }, function(err) {
			          if(err) {
			            log(cnLabel + ' [ ' + fileName + ' ] ' + 'save handle results to db error', err);
			          } else {
			            log(cnLabel + ' [ ' + fileName + ' ] ' + 'save handle results to db succeed!');
			          }
			        })
			      } else {
			        log(cnLabel + ' [ ' + fileName + ' ] ' + 'handle error,try again.', err)
			      } 
			    })
			  })
			}
		}
	}
})


function HandleCheckOrder(order) {
	log("HandleCheckOrder: I am called.");
	// handle companyName
	var companyName = "";
	var alternativeName = [];

	if(! order.hasOwnProperty("companyName") 
		|| !order.companyName.hasOwnProperty("mainName")
		|| !order.hasOwnProperty("industrySmall") ) {
		companyName = "";
	} else {
		companyName = order.companyName.mainName + '（上海）' + order.industrySmall + '有限责任公司'; 
	}	

	if(!order.hasOwnProperty("companyName")) {
		alternativeName = [];
	} else {
		var companyNameObj = order.companyName;
		if(companyNameObj.hasOwnProperty("alternativeName1")) {
			alternativeName.push(companyNameObj.alternativeName1);
		}
		if(companyNameObj.hasOwnProperty("alternativeName2")) {
			alternativeName.push(companyNameObj.alternativeName2);
		}
		if(companyNameObj.hasOwnProperty("alternativeName3")) {
			alternativeName.push(companyNameObj.alternativeName3);
		}				
		if(companyNameObj.hasOwnProperty("alternativeName4")) {
			alternativeName.push(companyNameObj.alternativeName4);
		}
	}


	var companyZone = "";

  if(!order.hasOwnProperty("servicesNameList")
   || !order.hasOwnProperty("typeNameFlag")
   || order.typeNameFlag === "registration") {
     var nameList = order.servicesNameList[0];
     if(nameList.hasOwnProperty("zone")) {
      companyZone = nameList.zone;
     } else {
      var name = nameList.name;
			companyZone = name.slice(name.lastIndexOf("[") + 1, name.lastIndexOf("]")) || "";
     }
  } else {
  	companyZone = "";
  }

  var businessScope = "";

  if(!order.hasOwnProperty("businessScope")) {
  	businessScope = "";
  } else {
  	businessScope = order.businessScope.toString();
  }


  var holderName = [];
  var holderID = [];
  
  if(order.hasOwnProperty("holders")) {
  	var holders = order.holders;
	  holders.forEach(function(holder) {
	  	if(holder.hasOwnProperty("holderName")) {
		    holderName.push(holder.holderName);
	  	} else {
	  		holderName.push("");
	  	}

	  	if(holder.hasOwnProperty("code")) {
	  		holderID.push(holder.code);
	  	} else {
	  		holderID.push("");
	  	}
	  })  
  }

  var moneyAmount = 0;
  if(order.hasOwnProperty("companyMoney")) {
  	moneyAmount = order.companyMoney;
  }

  var companyAddress = ""; // 公司地址
  var requests = [];
  if(companyZone === "虹口")  {
	  var checkBook = {
	    fileName: 'K0211090101',
	    cnLabel: '企业名称预先核准申请书',    
	    companyName: companyName,
	    alternativeName: alternativeName,
	    companyAddress: companyAddress,
	    businessScope: businessScope,
	    holderName: holderName,
	    holderID: holderID,
	    moneyAmount: moneyAmount
	  };
	  requests.push(checkBook)
  } else if(companyZone === "浦东") {

  var checkBook = {
    fileName: 'K0211020101',
    cnLabel: '企业名称预先核准申请书',    
    companyName: companyName,
    alternativeName: alternativeName,
    companyAddress: companyAddress,
    businessScope: businessScope,
    holderName: holderName,
    holderID: holderID,
    moneyAmount: moneyAmount
  }; 	
  requests.push(checkBook);
  var certification = {
    fileName: 'K0211020102',
    cnLabel: '委托人代理证明',
    holderName: holderName.join('、')
  };
  requests.push(certification);

   var authorizationPaper = {
    fileName: 'K0211020103',
    cnLabel: '委托书',
    holderName: holderName.join('、')
  }
  requests.push(authorizationPaper); 
 	
  }
  return requests;
}
