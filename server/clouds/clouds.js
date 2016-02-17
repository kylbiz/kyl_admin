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
	"GenerateRegTemplate": function(options) {
		log("GenerateRegTemplate: Hi, I am called!");
		if(!options 
			|| !options.hasOwnProperty("orderId")
			|| !options.hasOwnProperty("uuid") 
			|| !options.hasOwnProperty("zone")) {
			log("GenerateRegTemplate: options illegal", options);
		} else {
			var orderId = options.orderId;
			var uuid = options.uuid;
			var zone = options.zone;

			var order = Orders.findOne({orderId: orderId});

			if(!order) {
				log("GenerateTemplate: query order error");
			} else {	
      var requests = [];	
				switch(zone) {
			    case '虹口':
		        requests = HandleRegHKOrder(order);
		      break;
		    case '浦东':
            requests = HandleRegPDOrder(order);
		      break;
		    default: 
		      break;	
				}
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
          log(params, "开始提交生成文档");

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


function HandlePCOrder(order) {
  // handle companyName
  var _order = {};
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

  // log(companyName, alternativeName)

  var companyZone = "";
  var companyType = "有限责任公司";
  var companyId = "";
  var companyTel = "";
  var companyZipcode = ""; // TODO
  var businessPeriod = "";
  var addressFlag = "是";
  var companyAddress = ""; // 公司地址
  var productionAddress = ""; // 生产地址


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

  if(companyZone === "浦东") {
    businessPeriod = "20年";
  } else if(companyZone === "虹口") {
    businessPeriod = "长期";
  }

  if(!order.hasOwnProperty("companyAddress") || !order.companyAddress.length >=4 ) {
    if(companyZone === "浦东") {
      companyAddress = "浦东新区";
      productionAddress = companyAddress;   
    } else if(companyZone === "虹口") {
      companyAddress = "虹口区长阳路235号";
      productionAddress = companyAddress;
    } else {
      companyAddress = "";
      productionAddress = "";
    }
  } else {
    companyAddress = order.companyAddress;
    productionAddress = companyAddress;
  }


  var businessScope = "";

  if(!order.hasOwnProperty("businessScope")) {
    businessScope = "";
  } else {
    businessScope = order.businessScope.toString();
  }

  var moneyAmount = 0;
  if(order.hasOwnProperty("companyMoney")) {
    moneyAmount = order.companyMoney;
  }

  var legalPersonName = ""; //法人姓名
  var legalPersonPhone = "";
  var legalPersonTel = "";
  var legalPersonEmail = "";
  var legalPersonID = "";
  var legalPersonIDType = "身份证";

  if(order.hasOwnProperty("legalPerson")) {
    legalPersonName = order.legalPerson.legalPersonName || "";
    legalPersonID = order.legalPerson.legalPersonId || "";
  }

  var chairmanName = legalPersonName || "";
  var chairmanType = "执行董事";
  var chairmanIDType = "身份证";
  var chairmanID = legalPersonID || "";
  var chairmanPhone = legalPersonPhone || "";

  var supervisorName = "";
  var supervisorType = "监事";
  var supervisorIDType = "身份证";
  var supervisorID = "";
  if(order.hasOwnProperty("supervisor")) {
    supervisorName = order.supervisor.supervisorName || "";
    supervisorID = order.supervisor.supervisorId || "";
  }

  var managerName = legalPersonName || "";
  var managerType = "经理";
  var managerIDType = "身份证";
  var managerID = legalPersonID || "";

  var contractorName = "";
  var contractorTel = "";
  var contractorPhone = "";
  var contractorEmail = "";
  var contractorIDType = "身份证";
  var contractorID = "";

  if(order.hasOwnProperty("contractor")
    && order.contractor.hasOwnProperty("liaisons")) {
    var liaisons = order.contractor.liaisons;
    contractorName = liaisons.liaisonsName;
    contractorID = liaisons.liaisonsId;
    contractorPhone = liaisons.liaisonsPhone;
    contractorEmail = liaisons.liaisonsEmail;
  }

  var financialStaffName = "";
  var financialStallTel = "";
  var financialStaffPhone = "";
  var financialStaffEmail = "";
  var financialStaffIDType = "身份证";
  var financialStaffID = "";

  if(order.hasOwnProperty("contractor")
    && order.contractor.hasOwnProperty("financialStaff")) {  
    var financialStaff = order.contractor.financialStaff;
    financialStaffName = financialStaff.financialStaffName;
    financialStaffID = financialStaff.financialStaffId;
    financialStaffPhone = financialStaff.financialStaffPhone;
    financialStaffEmail = financialStaff.financialStaffEmail;
  }

  var authorizationFlag = "是";
  var createTime = new Date();
  var year = createTime.getFullYear();
  var month = createTime.getMonth() + 1;
  var day = '28';
  // var investDate = (year + 10) + '年' + month + '月' + day + '日';
  var investDate = "";
  if(companyZone === "虹口") {
    investDate = moment(createTime).add(20, 'years').format("YYYY.M.D");
  } else if(companyZone === "浦东") {
    investDate = "公司设立之日起20年内";
  } else {
    investDate = "";
  }

  var mettingDate = year + '年' + month + '月' + day + '日';  

  var authorizationDate = "";

  var authorizationStart = moment(createTime).format("YYYY年 M 月 D 日");
  var authorizationEnd = moment(createTime).add(3, 'months').format("YYYY年 M 月 D 日")
  log(authorizationStart, authorizationEnd)

  authorizationDate = authorizationStart + ' 至 ' + authorizationEnd;

  var agent = "";
  if(order.hasOwnProperty("agent")) {
    agent = order.agent;
  } else {
    agent = "";
  }



  var regulationFileName = '';
  var holderFileName = '';
  var registrationFileName = '';

  var holderName = [];
  var holderIDType = [];    
  var holderID = [];
  var investType = [];
  var investShare = [];
  var investMoneyAmount = [];
  var investDateOutput = [];

  var holderLength = 0;
  if(order.hasOwnProperty("holders")) {
    holderLength = order.holders.length;
  }

 
  if(order.hasOwnProperty("holders")) {
    var holders = order.holders;

    holders.forEach(function(holder) {
      if(holder.hasOwnProperty("holderName")) {
        holderName.push(holder.holderName);
      } else {
        holderName.push("");
      }
      log(holder)
      holderIDType.push("身份证");
      if(holder.hasOwnProperty("code")) {
        holderID.push(holder.code);
      } else {
        holderID.push("");
      }

      investType.push("货币");

      if(holder.hasOwnProperty("moneyPercent")) {
        investShare.push(holder.moneyPercent + "%");
      } else {
        investShare.push("");
      }

      if(holder.hasOwnProperty("money")) {
        investMoneyAmount.push(holder.money);
      } else {
        investMoneyAmount.push("");
      }

      investDateOutput.push(investDate);
    })
  };

  _order.companyName = companyName || "";
  _order.alternativeName = alternativeName || [];
  _order.companyZone = companyZone || "";
  _order.companyType = companyType || "";
  _order.companyId = companyId || "";
  _order.companyTel = companyTel || "";

  _order.companyZipcode = companyZipcode || "";

  _order.businessPeriod = businessPeriod || "";
  _order.addressFlag = addressFlag || "";
  _order.companyAddress = companyAddress || "";
  _order.productionAddress = productionAddress || "";
  _order.moneyAmount = moneyAmount || 0;

  _order.businessScope = businessScope || "";

  _order.legalPersonName = legalPersonName || "";
  _order.legalPersonPhone = legalPersonPhone || "";
  _order.legalPersonTel = legalPersonTel || "";
  _order.legalPersonEmail = legalPersonEmail || "";
  _order.legalPersonID = legalPersonID || "";
  _order.legalPersonIDType = legalPersonIDType || "身份证";
  _order.chairmanName = chairmanName || "";
  _order.chairmanType = chairmanType || "";
  _order.chairmanIDType = chairmanIDType || "";
  _order.chairmanID = chairmanID || "";
  _order.chairmanPhone = chairmanPhone || "";

  _order.supervisorName = supervisorName || "";
  _order.supervisorType = supervisorType || "";
  _order.supervisorIDType = supervisorIDType || "身份证";
  _order.supervisorID = supervisorID || "";

  _order.managerName = managerName || "";
  _order.managerType = managerType || "";
  _order.managerIDType = managerIDType || "身份证";
  _order.managerID = managerID || "";

  _order.contractorName = contractorName || "";
  _order.contractorTel = contractorTel || "";
  _order.contractorPhone = contractorPhone || "";
  _order.contractorEmail = contractorEmail || "";
  _order.contractorIDType = contractorIDType || "身份证";
  _order.contractorID = contractorID || "";

  _order.financialStaffName = financialStaffName || "";
  _order.financialStallTel = financialStallTel || "";
  _order.financialStaffPhone = financialStaffPhone || "";
  _order.financialStaffEmail = financialStaffEmail || "";
  _order.financialStaffIDType = financialStaffIDType || "身份证";
  _order.financialStaffID = financialStaffID || "";

  _order.authorizationFlag = authorizationFlag || "是";

  _order.investDate  = investDate  || "";
  _order.mettingDate = mettingDate || "";

  _order.holderName = holderName || [];
  _order.holderIDType = holderIDType || [];
  _order.holderID = holderID || [];
  _order.investType = investType || [];
  _order.investShare = investShare || [];
  _order.investMoneyAmount = investMoneyAmount || [];
  _order.investDateOutput = investDateOutput || [];

  _order.holderLength = holderLength || 0;
  _order.agent = agent || "";

  _order.authorizationDate = authorizationDate || "";


  log(_order)

  return _order;

}


function HandleRegHKOrder(order) {
	log("HandleRegHKOrder: I am called.")

  var _order = HandlePCOrder(order);
  
  var regulationFileName = '';
  var holderFileName = '';
  var registrationFileName = '';

	log("holderLength: " + _order.holderLength)
  if(_order.holderLength <= 1) {
    log("单人")
    regulationFileName = 'K0211090301';
    holderFileName = 'K0211090201';
    registrationFileName = 'K0211090601';

    var regulations = {
      fileName: regulationFileName,
      cnLabel : '公司章程',
      companyName: _order.companyName,
      companyAddress: _order.companyAddress,
      productionAddress: _order.productionAddress,
      businessScope: _order.businessScope,
      moneyAmount: _order.moneyAmount,
      registeredCapital: _order.moneyAmount,
      holderName: _order.holderName[0],
      investDate: _order.investDateOutput[0],
      investType: _order.investType[0],
      investMoney: _order.investMoneyAmount[0]
    }

  } else {
    log('多人')
    regulationFileName = 'K0211090302';
    holderFileName = 'K0211090202';
    registrationFileName = 'K0211090602'; 
    var regulations = {
      fileName: regulationFileName,
      cnLabel : '公司章程',
      companyName: _order.companyName,
      companyAddress: _order.companyAddress,
      productionAddress: _order.productionAddress,
      businessScope: _order.businessScope,
      moneyAmount: _order.moneyAmount,
      registeredCapital: _order.moneyAmount,
      holderName: _order.holderName,
      investDate: _order.investDateOutput,
      investType: _order.investType,
      investMoney: _order.investMoneyAmount
    }
  }  

  var requests = [];
  requests.push(regulations);

  var shareholder = {
    fileName : holderFileName,
    cnLabel : '股东会决议',
    mettingDate:  _order.mettingDate,
    companyName : _order.companyName,
    chairmanName: _order.chairmanName,
    managerName: _order.managerName,
    supervisorName:_order.supervisorName,
    supervisorID: _order.supervisorID
  }
  requests.push(shareholder)

  var leasing = {
    fileName: 'K0211090401',
    cnLabel: '房屋租赁合同',
    companyName: _order.companyName,
    companyAddress: _order.companyAddress     
  }
  requests.push(leasing);

  // 公司备案申请书  
  var registrationBook = {
    fileName: registrationFileName,
    cnLabel : '公司登记（备案）申请书',    
    companyName: _order.companyName,
    companyZone: _order.companyZone,
    companyType: _order.companyType,

    companyId: _order.companyId,
    companyTel: _order.companyTel,
    companyZipcode: _order.companyZipcode,
    businessScope: _order.businessScope,
    businessPeriod: _order.businessPeriod,

    companyAddress: _order.companyAddress,
    productionAddress: _order.productionAddress,

    legalPersonName: _order.legalPersonName,
    legalPersonTel: _order.legalPersonTel,
    legalPersonPhone: _order.legalPersonPhone,
    legalPersonEmail: _order.legalPersonEmail,
    legalPersonIDType: _order.legalPersonIDType,
    legalPersonID: _order.legalPersonID,

    chairmanName: _order.chairmanName,
    chairmanType: _order.chairmanType,
    chairmanIDType: _order.chairmanIDType,
    chairmanID: _order.chairmanID,
    chairmanPhone: _order.chairmanPhone,

    supervisorName: _order.supervisorName,
    supervisorType: _order.supervisorType,
    supervisorIDType: _order.supervisorIDType,
    supervisorID: _order.supervisorID,

    managerName: _order.managerName,
    managerType: _order.managerType,
    managerIDType: _order.managerIDType,
    managerID: _order.managerID,

    holderName: _order.holderName,
    holderIDType: _order.holderIDType,
    holderID: _order.holderID,
    investType: _order.investType,
    investDate: _order.investDateOutput,
    money: _order.investMoneyAmount,
    share: _order.investShare,
    moneyAmount: _order.moneyAmount,

    contractorName: _order.contractorName,
    contractorTel: _order.contractorTel,
    contractorPhone: _order.contractorPhone,
    contractorEmail: _order.contractorEmail,
    contractorIDType: _order.contractorIDType,
    contractorID: _order.contractorID,

    financialStaffName: _order.financialStaffName,
    financialStallTel: _order.financialStallTel,
    financialStaffPhone: _order.financialStaffPhone,
    financialStaffEmail: _order.financialStaffEmail,
    financialStaffIDType: _order.financialStaffIDType,
    financialStaffID: _order.financialStaffID
  }

  requests.push(registrationBook);

  var commitment = {
    fileName: 'K0211090701',
    cnLabel : '广告企业告知承诺书'
  };

  requests.push(commitment);

  var appraise = {
    fileName: 'K0211090801',
    cnLabel : '小型微型企业认定申请表'
  };
  requests.push(appraise);

  var companyIdApplication = {
    fileName: 'K0211090901',
    cnLabel : '上海市组织机构代码申请表'
  };

  requests.push(companyIdApplication);

  var note = {
    fileName: 'K0211091001',
    cnLabel : '情况说明'
  };

  requests.push(note);
  return requests;
}



function HandleRegPDOrder(order) {
  log("HandleRegPDOrder: I am called.")

  var _order = HandlePCOrder(order);  
  var regulationFileName = '';
  var holderFileName = '';
  var registrationFileName = '';

  log("holderLength: " + _order.holderLength)
  if(_order.holderLength <= 1) {
    log("单人")
    regulationFileName = 'K0211020301';
    holderFileName = 'K0211020201';
    registrationFileName = 'K0211020601';

    var regulations = {
      fileName: regulationFileName,
      cnLabel : '公司章程',
      companyName: _order.companyName,
      companyAddress: _order.companyAddress,
      productionAddress: _order.productionAddress,
      businessScope: _order.businessScope,
      moneyAmount: _order.moneyAmount,
      registeredCapital: _order.moneyAmount,
      holderName: _order.holderName[0],
      investDate: _order.investDateOutput[0],
      investType: _order.investType[0],
      investMoney: _order.investMoneyAmount[0]
    }

  } else {
    log('多人')
    regulationFileName = 'K0211020302';
    holderFileName = 'K0211020202';
    registrationFileName = 'K0211020602'; 
    var regulations = {
      fileName: regulationFileName,
      cnLabel : '公司章程',
      companyName: _order.companyName,
      companyAddress: _order.companyAddress,
      productionAddress: _order.productionAddress,
      businessScope: _order.businessScope,
      moneyAmount: _order.moneyAmount,
      registeredCapital: _order.moneyAmount,
      holderName: _order.holderName,
      holderNames: _order.holderName.join('、'),
      share: _order.investShare,
      investDate: _order.investDateOutput,
      investType: _order.investType,
      investMoney: _order.investMoneyAmount
    }
  }  

  var requests = [];
  requests.push(regulations);

  var shareholder = {
    fileName : holderFileName,
    cnLabel : '股东会决议',
    mettingDate:  _order.mettingDate,
    companyName : _order.companyName,
    chairmanName: _order.chairmanName,
    supervisorName:_order.supervisorName,
    managerName: _order.managerName,
    holderNumber: _order.holderLength,
    supervisorID: _order.supervisorID
  }
  requests.push(shareholder)

  var leasing = {
    fileName: 'K0211090401',
    cnLabel: '房屋租赁合同',
    companyName: _order.companyName,
    companyAddress: _order.companyAddress     
  }
  requests.push(leasing);

  // 公司备案申请书  
  var registrationBook = {
    fileName: registrationFileName,
    cnLabel : '公司登记（备案）申请书',    
    companyName: _order.companyName,
    companyZone: _order.companyZone,
    companyType: _order.companyType,

    companyId: _order.companyId,
    companyTel: _order.companyTel,
    companyZipcode: _order.companyZipcode,
    businessScope: _order.businessScope,
    businessPeriod: _order.businessPeriod,

    companyAddress: _order.companyAddress,
    productionAddress: _order.productionAddress,

    legalPersonName: _order.legalPersonName,
    legalPersonTel: _order.legalPersonTel,
    legalPersonPhone: _order.legalPersonPhone,
    legalPersonEmail: _order.legalPersonEmail,
    legalPersonIDType: _order.legalPersonIDType,
    legalPersonID: _order.legalPersonID,

    chairmanName: _order.chairmanName,
    chairmanType: _order.chairmanType,
    chairmanIDType: _order.chairmanIDType,
    chairmanID: _order.chairmanID,
    chairmanPhone: _order.chairmanPhone,

    supervisorName: _order.supervisorName,
    supervisorType: _order.supervisorType,
    supervisorIDType: _order.supervisorIDType,
    supervisorID: _order.supervisorID,

    managerName: _order.managerName,
    managerType: _order.managerType,
    managerIDType: _order.managerIDType,
    managerID: _order.managerID,

    holderName: _order.holderName,
    holderIDType: _order.holderIDType,
    holderID: _order.holderID,
    investType: _order.investType,
    investDate: _order.investDateOutput,
    money: _order.investMoneyAmount,
    share: _order.investShare,
    moneyAmount: _order.moneyAmount,

    contractorName: _order.contractorName,
    contractorTel: _order.contractorTel,
    contractorPhone: _order.contractorPhone,
    contractorEmail: _order.contractorEmail,
    contractorIDType: _order.contractorIDType,
    contractorID: _order.contractorID,

    financialStaffName: _order.financialStaffName,
    financialStallTel: _order.financialStallTel,
    financialStaffPhone: _order.financialStaffPhone,
    financialStaffEmail: _order.financialStaffEmail,
    financialStaffIDType: _order.financialStaffIDType,
    financialStaffID: _order.financialStaffID
  }

  requests.push(registrationBook);

  var commitment = {
    fileName: 'K0211020701',
    cnLabel : '广告企业告知承诺书'
  };

  requests.push(commitment);
  
  var certification = {
    fileName: 'K0211021101',
    cnLabel: '委托人代理证明',
    holderName: _order.holderName.join('、'),
    companyName: _order.companyName,
    authorizationDate: _order.authorizationDate,  
    agent: _order.agent  
  };
  requests.push(certification);

   var authorizationPaper = {
    fileName: 'K0211020501',
    cnLabel: '指定代表或者共同委托代理人授权委托书',
    holderName: _order.holderName.join('、'),
    companyName: _order.companyName,
    authorizationDate: _order.authorizationDate,
    agent: _order.agent
  }

  requests.push(authorizationPaper); 

  var cogeneration = {
      fileName: 'K0211021001',
      cnLabel : '联动登记申请单',
      companyName: _order.companyName,
      companyAddress: _order.companyAddress,
      legalPersonName: _order.legalPersonName,
      legalPersonPhone: _order.legalPersonPhone,
      companyType: _order.companyType,
      zipcode: _order.companyZipcode    
    }
    requests.push(cogeneration);
  return requests;
}

