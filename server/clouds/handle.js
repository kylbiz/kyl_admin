// var order = { 
//     "_id" : "5yby7pawA7QdbGL8b", 
//     "userId" : "R8hD74ADSLZtipL3A", 
//     "productType" : "公司注册", 
//     "typeNameFlag" : "registration", 
//     "payed" : true, 
//     "host" : "KYLWX", 
//     "createTime" : "2016-01-07T08:12:09.912+0000", 
//     "moneyAmount" : 1000, 
//     "servicesNameList" : [
//         {
//             "name" : "极速注册", 
//             "money" : 1000, 
//             "scale" : 1, 
//             "zone" : "虹口", 
//             "servicesContains" : [
//                 {
//                     "name" : "新版营业执照、新版营业执照副本、公司章、法人章、财务章"
//                 }
//             ]
//         }
//     ], 
//     "productProgress" : {
//         "status" : 0, 
//         "updateTimes" : [
//             "2016-01-07T08:11:57.650+0000"
//         ]
//     }, 
//     "cartId" : "TsQ7RncjpCputCTw4", 
//     "canceled" : false, 
//     "finished" : false, 
//     "userConfirmed" : false, 
//     "invoice" : false, 
//     "openid" : "201601071612099073825", 
//     "orderId" : "201601071612099125797", 
//     "addressInfo" : {
//         "userId" : "R8hD74ADSLZtipL3A", 
//         "receiver" : "刘遵坤", 
//         "address" : "上海市普陀区澳门路三维大厦21D", 
//         "phone" : "15618871296", 
//         "tel" : "", 
//         "zipcode" : ""
//     }, 
//     "companyName" : {
//         "mainName" : "分享创业", 
//         "alternativeName1" : "责任人", 
//         "alternativeName2" : "离线担当"
//     }, 
//     "companyType" : "有限公司", 
//     "industryBig" : "科技类", 
//     "industrySmall" : "网络科技", 
//     "businessScope" : [
//         "技术开发", 
//         "技术咨询", 
//         "技术服务", 
//         "技术转让，监控设备", 
//         "家用电器", 
//         "机电设备", 
//         "五金交电", 
//         "电线电缆", 
//         "通讯设备（除卫星电视广播地面接收设施）", 
//         "计算机", 
//         "软件及辅助设备（除计算机信息系统安全专用产品）", 
//         "电子产品的批发", 
//         "零售，电子商务（不得从事增值电信", 
//         "金融业务），计算机网络工程施工"
//     ], 
//     "companyMoney" : "200", 
//     "holders" : [
//         {
//             "selectType" : 0, 
//             "holderType" : "自然人", 
//             "holderName" : "刘遵坤", 
//             "money" : "150", 
//             "moneyPercent" : "80", 
//             "holderId" : "4648066253", 
//             "sex" : "男", 
//             "code" : "411502199006029612", 
//             "address" : "吉林省长春市南关区净月大街2555号"
//         }, 
//         {
//             "selectType" : 0, 
//             "holderType" : "自然人", 
//             "holderName" : "文舒", 
//             "money" : "50", 
//             "moneyPercent" : "20", 
//             "holderId" : "2947263042", 
//             "sex" : "男", 
//             "code" : "310110198506265119", 
//             "address" : "上海市普陀区澳门路三围大厦21D"
//         }
//     ], 
//     "legalPerson" : {
//         "legalPersonName" : "刘遵坤H", 
//         "legalPersonId" : "411502199006029612"
//     }, 
//     "supervisor" : {
//         "supervisorName" : "文舒LH", 
//         "supervisorId" : "310110198506265112"
//     }, 
//     "contractor" : {
//         "liaisons" : {
//             "liaisonsName" : "文舒2", 
//             "liaisonsId" : "520301198702232991", 
//             "liaisonsPhone" : "15618871295", 
//             "liaisonsEmail" : "mail.liuzunkun.com"
//         }, 
//         "financialStaff" : {
//             "financialStaffName" : "谢老二", 
//             "financialStaffId" : "350926197803244776", 
//             "financialStaffPhone" : "15618871296", 
//             "financialStaffEmail" : "liuzk552@gmail.com"
//         }
//     }, 
//     "consigner" : {
//         "consignerName" : "刘遵坤", 
//         "consignerPhone" : "15618871296", 
//         "consignerEmail" : "zunkun.liu@kyl.biz", 
//         "consignerQQ" : ""
//     }
// }


// function log(info) {
//   var len = arguments.length;
//   console.log('------------------------------------')
//   for(var i = 0; i < len; i++) {
//     console.log(arguments[i]);
//   }
// };


// function HandleRegHKOrder(order) {
// 	log("HandleRegOrder: I am called.")

// 	// handle companyName
// 	var companyName = "";
// 	var alternativeName = [];

// 	if(! order.hasOwnProperty("companyName") 
// 		|| !order.companyName.hasOwnProperty("mainName")
// 		|| !order.hasOwnProperty("industrySmall") ) {
// 		companyName = "";
// 	} else {
// 		companyName = order.companyName.mainName + '（上海）' + order.industrySmall + '有限责任公司'; 
// 	}	

// 	if(!order.hasOwnProperty("companyName")) {
// 		alternativeName = [];
// 	} else {
// 		var companyNameObj = order.companyName;
// 		if(companyNameObj.hasOwnProperty("alternativeName1")) {
// 			alternativeName.push(companyNameObj.alternativeName1);
// 		}
// 		if(companyNameObj.hasOwnProperty("alternativeName2")) {
// 			alternativeName.push(companyNameObj.alternativeName2);
// 		}
// 		if(companyNameObj.hasOwnProperty("alternativeName3")) {
// 			alternativeName.push(companyNameObj.alternativeName3);
// 		}				
// 		if(companyNameObj.hasOwnProperty("alternativeName4")) {
// 			alternativeName.push(companyNameObj.alternativeName4);
// 		}
// 	}

// 	// log(companyName, alternativeName)

// 	var companyZone = "";
// 	var companyType = "有限责任公司";
// 	var companyId = "";
// 	var companyTel = "";
// 	var companyZipcode = ""; // TODO
// 	var businessPeriod = "十年";
// 	var addressFlag = "是";
//   var companyAddress = ""; // 公司地址
//   var productionAddress = ""; // 生产地址


//   if(!order.hasOwnProperty("servicesNameList")
//    || !order.hasOwnProperty("typeNameFlag")
//    || order.typeNameFlag === "registration") {
//      var nameList = order.servicesNameList[0];
//      if(nameList.hasOwnProperty("zone")) {
//       companyZone = nameList.zone;
//      } else {
//       var name = nameList.name;
// 			companyZone = name.slice(name.lastIndexOf("[") + 1, name.lastIndexOf("]")) || "";
//      }
//   } else {
//   	companyZone = "";
//   }

//   var businessScope = "";

//   if(!order.hasOwnProperty("businessScope")) {
//   	businessScope = "";
//   } else {
//   	businessScope = order.businessScope.toString();
//   }

//   var moneyAmount = 0;
//   if(order.hasOwnProperty("companyMoney")) {
//   	moneyAmount = order.companyMoney;
//   }

//   var legalPersonName = ""; //法人姓名
//   var legalPersonPhone = "";
//   var legalPersonTel = "";
//   var legalPersonEmail = "";
//   var legalPersonID = "";
//   var legalPersonIDType = "身份证";

//   if(order.hasOwnProperty("legalPerson")) {
//   	legalPersonName = order.legalPerson.legalPersonName || "";
//   	legalPersonID = order.legalPerson.legalPersonId || "";
//   }

//   var chairmanName = "";
//   var chairmanType = "";
//   var chairmanIDType = "";
//   var chairmanID = "";
//   var chairmanPhone = "";

//  	var supervisorName = "";
//  	var supervisorType = "";
//  	var supervisorIDType = "身份证";
//  	var supervisorID = "";
//   if(order.hasOwnProperty("supervisor")) {
//   	supervisorName = order.supervisor.supervisorName || "";
//   	supervisorID = order.supervisor.supervisorId || "";
//   }

//   var managerName = "";
//   var managerType = "";
//   var managerIDType = "";
//   var managerID = "";

//   var contractorName = "";
//   var contractorTel = "";
//   var contractorPhone = "";
//   var contractorEmail = "";
//   var contractorIDType = "身份证";
//   var contractorID = "";

//   if(order.hasOwnProperty("contractor")
//   	&& order.contractor.hasOwnProperty("liaisons")) {
//   	var liaisons = order.contractor.liaisons;
//   	consignerName = liaisons.liaisonsName;
//   	contractorID = liaisons.liaisonsId;
//   	contractorPhone = liaisons.liaisonsPhone;
//   	contractorEmail = liaisons.liaisonsEmail;
//   }

//   var financialStaffName = "";
//   var financialStallTel = "";
//   var financialStaffPhone = "";
//   var financialStaffEmail = "";
//   var financialStaffIDType = "身份证";
//   var financialStaffID = "";

//   if(order.hasOwnProperty("contractor")
//   	&& order.contractor.hasOwnProperty("financialStaff")) {  
//   	var financialStaff = order.contractor.financialStaff;
//   	financialStaffName = financialStaff.financialStaffName;
//   	financialStaffID = financialStaff.financialStaffId;
//   	financialStaffPhone = financialStaff.financialStaffPhone;
//   	financialStaffEmail = financialStaff.financialStaffEmail;
//   }

//   var authorizationFlag = "是";
//   var createTime = new Date();
//   var year = createTime.getFullYear();
//   var month = createTime.getMonth() + 1;
//   var day = '28';
//   var investDate = (year + 10) + '年' + month + '月' + day + '日';
//   var mettingDate = year + '年' + month + '月' + day + '日';  

//   var regulationFileName = '';
//   var holderFileName = '';
//   var registrationFileName = '';

//   var holderName = [];
//   var holderIDType = [];    
//   var holderID = [];
//   var investType = [];
//   var investShare = [];
//   var investMoneyAmount = [];
//   var investDateOutput = [];

//   var holderLength = 0;
//   if(order.hasOwnProperty("holders")) {
//   	holderLength = order.holders.length;
//   }

 
//   if(order.hasOwnProperty("holders")) {
//   	var holders = order.holders;

// 	  holders.forEach(function(holder) {
// 	  	if(holder.hasOwnProperty("holderName")) {
// 		    holderName.push(holder.holderName);
// 	  	} else {
// 	  		holderName.push("");
// 	  	}

// 	    holderIDType.push("身份证");

// 	  	if(holder.hasOwnProperty("holderId")) {
// 	  		holderID.push(holder.holderId);
// 	  	} else {
// 	  		holderID.push("");
// 	  	}

// 	  	if(holder.hasOwnProperty("holderType")) {
// 	  		investType.push(holder.holderType);
// 	  	} else {
// 	  		investType.push("");
// 	  	}

// 	  	if(holder.hasOwnProperty("moneyPercent")) {
// 	  		investShare.push(holder.moneyPercent + "%");
// 	  	} else {
// 	  		investShare.push("");
// 	  	}

// 	  	if(holder.hasOwnProperty("money")) {
// 	  		investMoneyAmount.push(holder.money);
// 	  	} else {
// 	  		investMoneyAmount.push("");
// 	  	}

// 	    investDateOutput.push(investDate);
// 	  })
// 	};

// 	log("holderLength: " + holderLength)
//   if(holderLength <= 1) {
//     log("单人")
//     regulationFileName = 'K0211090301';
//     holderFileName = 'K0211090201';
//     registrationFileName = 'K0211090601';

//     var regulations = {
//       fileName: regulationFileName,
//       cnLabel : '公司章程',
//       companyName: companyName,
//       companyAddress: companyAddress,
//       productionAddress: productionAddress,
//       businessScope: businessScope,
//       moneyAmount: moneyAmount,
//       holderName: holderName[0],
//       investDate: investDateOutput[0],
//       investType: investType[0],
//       investMoney: investMoneyAmount[0]
//     }

//   } else {
//     log('多人')
//     regulationFileName = 'K0211090302';
//     holderFileName = 'K0211090202';
//     registrationFileName = 'K0211090602'; 
//     var regulations = {
//       fileName: regulationFileName,
//       cnLabel : '公司章程',
//       companyName: companyName,
//       companyAddress: companyAddress,
//       productionAddress: productionAddress,
//       businessScope: businessScope,
//       moneyAmount: moneyAmount,
//       holderName: holderName,
//       investDate: investDateOutput,
//       investType: investType,
//       investMoney: investMoneyAmount
//     }
//   }  

//   var requests = [];
//   requests.push(regulations);

//   var shareholder = {
//     fileName : holderFileName,
//     cnLabel : '股东会决议',
//     mettingDate: mettingDate,
//     companyName : companyName,
//     chairmanName: chairmanName,
//     managerName: managerName,
//     supervisorName:supervisorName,
//     supervisorID: supervisorID
//   }
//   requests.push(shareholder)

//   var leasing = {
//     fileName: 'K0211090401',
//     cnLabel: '房屋租赁合同',
//     companyName: companyName,
//     companyAddress: companyAddress     
//   }
//   requests.push(leasing);

//   // 公司备案申请书  // 公司备案申请书
//   var registrationBook = {
//     fileName: registrationFileName,
//     cnLabel : '公司登记（备案）申请书',    
//     companyName: companyName,
//     companyZone: companyZone,
//     companyType: companyType,
//     companyId: companyId,
//     companyTel: companyTel,
//     companyZipcode: companyZipcode,
//     businessScope: businessScope,
//     businessPeriod: businessPeriod,

//     companyAddress: companyAddress,
//     productionAddress: productionAddress,

//     legalPersonName: legalPersonName,
//     legalPersonTel: legalPersonTel,
//     legalPersonPhone: legalPersonPhone,
//     legalPersonEmail: legalPersonEmail,
//     legalPersonIDType: legalPersonIDType,
//     legalPersonID: legalPersonID,

//     chairmanName: chairmanName,
//     chairmanType: chairmanType,
//     chairmanIDType: chairmanIDType,
//     chairmanID: chairmanID,
//     chairmanPhone: chairmanPhone,

//     supervisorName: supervisorName,
//     supervisorType: supervisorType,
//     supervisorIDType: supervisorIDType,
//     supervisorID: supervisorID,

//     managerName: managerName,
//     managerType: managerType,
//     managerIDType: managerIDType,
//     managerID: managerID,

//     holderName: holderName,
//     holderIDType: holderIDType,
//     holderID: holderID,
//     investType: investType,
//     investDate: investDateOutput,
//     money: investMoneyAmount,
//     share: investShare,
//     moneyAmount: moneyAmount,

//     contractorName: contractorName,
//     contractorTel: contractorTel,
//     contractorPhone: contractorPhone,
//     contractorEmail: contractorEmail,
//     contractorIDType: contractorIDType,
//     contractorID: contractorID,

//     financialStaffName: financialStaffName,
//     financialStallTel: financialStallTel,
//     financialStaffPhone: financialStaffPhone,
//     financialStaffEmail: financialStaffEmail,
//     financialStaffIDType: financialStaffIDType,
//     financialStaffID: financialStaffID
//   }

//   requests.push(registrationBook);

//   var commitment = {
//     fileName: 'K0211090701',
//     cnLabel : '广告企业告知承诺书'
//   };

//   requests.push(commitment);

//   var appraise = {
//     fileName: 'K0211090801',
//     cnLabel : '小型微型企业认定申请表'
//   };
//   requests.push(appraise);

//   var companyIdApplication = {
//     fileName: 'K0211090901',
//     cnLabel : '上海市组织机构代码申请表'
//   };

//   requests.push(companyIdApplication);

//   var note = {
//     fileName: 'K0211091001',
//     cnLabel : '情况说明'
//   };

//   requests.push(note);
//   return requests;
// }

// // HandleRegHKOrder(order)


// function HandleRegPDOrder(order) {
// 	log("HandleRegOrder: I am called.")

// 	// handle companyName
// 	var companyName = "";
// 	var alternativeName = [];

// 	if(! order.hasOwnProperty("companyName") 
// 		|| !order.companyName.hasOwnProperty("mainName")
// 		|| !order.hasOwnProperty("industrySmall") ) {
// 		companyName = "";
// 	} else {
// 		companyName = order.companyName.mainName + '（上海）' + order.industrySmall + '有限责任公司'; 
// 	}	

// 	if(!order.hasOwnProperty("companyName")) {
// 		alternativeName = [];
// 	} else {
// 		var companyNameObj = order.companyName;
// 		if(companyNameObj.hasOwnProperty("alternativeName1")) {
// 			alternativeName.push(companyNameObj.alternativeName1);
// 		}
// 		if(companyNameObj.hasOwnProperty("alternativeName2")) {
// 			alternativeName.push(companyNameObj.alternativeName2);
// 		}
// 		if(companyNameObj.hasOwnProperty("alternativeName3")) {
// 			alternativeName.push(companyNameObj.alternativeName3);
// 		}				
// 		if(companyNameObj.hasOwnProperty("alternativeName4")) {
// 			alternativeName.push(companyNameObj.alternativeName4);
// 		}
// 	}

// 	// log(companyName, alternativeName)

// 	var companyZone = "";
// 	var companyType = "有限责任公司";
// 	var companyId = "";
// 	var companyTel = "";
// 	var companyZipcode = ""; // TODO
// 	var businessPeriod = "十年";
// 	var addressFlag = "是";
//   var companyAddress = ""; // 公司地址
//   var productionAddress = ""; // 生产地址


//   if(!order.hasOwnProperty("servicesNameList")
//    || !order.hasOwnProperty("typeNameFlag")
//    || order.typeNameFlag === "registration") {
//      var nameList = order.servicesNameList[0];
//      if(nameList.hasOwnProperty("zone")) {
//       companyZone = nameList.zone;
//      } else {
//       var name = nameList.name;
// 			companyZone = name.slice(name.lastIndexOf("[") + 1, name.lastIndexOf("]")) || "";
//      }
//   } else {
//   	companyZone = "";
//   }

//   var businessScope = "";

//   if(!order.hasOwnProperty("businessScope")) {
//   	businessScope = "";
//   } else {
//   	businessScope = order.businessScope.toString();
//   }

//   var moneyAmount = 0;
//   if(order.hasOwnProperty("companyMoney")) {
//   	moneyAmount = order.companyMoney;
//   }

//   var legalPersonName = ""; //法人姓名
//   var legalPersonPhone = "";
//   var legalPersonTel = "";
//   var legalPersonEmail = "";
//   var legalPersonID = "";
//   var legalPersonIDType = "身份证";

//   if(order.hasOwnProperty("legalPerson")) {
//   	legalPersonName = order.legalPerson.legalPersonName || "";
//   	legalPersonID = order.legalPerson.legalPersonId || "";
//   }

//   var chairmanName = "";
//   var chairmanType = "";
//   var chairmanIDType = "";
//   var chairmanID = "";
//   var chairmanPhone = "";

//  	var supervisorName = "";
//  	var supervisorType = "";
//  	var supervisorIDType = "身份证";
//  	var supervisorID = "";
//   if(order.hasOwnProperty("supervisor")) {
//   	supervisorName = order.supervisor.supervisorName || "";
//   	supervisorID = order.supervisor.supervisorId || "";
//   }

//   var managerName = "";
//   var managerType = "";
//   var managerIDType = "";
//   var managerID = "";

//   var contractorName = "";
//   var contractorTel = "";
//   var contractorPhone = "";
//   var contractorEmail = "";
//   var contractorIDType = "身份证";
//   var contractorID = "";

//   if(order.hasOwnProperty("contractor")
//   	&& order.contractor.hasOwnProperty("liaisons")) {
//   	var liaisons = order.contractor.liaisons;
//   	consignerName = liaisons.liaisonsName;
//   	contractorID = liaisons.liaisonsId;
//   	contractorPhone = liaisons.liaisonsPhone;
//   	contractorEmail = liaisons.liaisonsEmail;
//   }

//   var financialStaffName = "";
//   var financialStallTel = "";
//   var financialStaffPhone = "";
//   var financialStaffEmail = "";
//   var financialStaffIDType = "身份证";
//   var financialStaffID = "";

//   if(order.hasOwnProperty("contractor")
//   	&& order.contractor.hasOwnProperty("financialStaff")) {  
//   	var financialStaff = order.contractor.financialStaff;
//   	financialStaffName = financialStaff.financialStaffName;
//   	financialStaffID = financialStaff.financialStaffId;
//   	financialStaffPhone = financialStaff.financialStaffPhone;
//   	financialStaffEmail = financialStaff.financialStaffEmail;
//   }

//   var authorizationFlag = "是";
//   var createTime = new Date();
//   var year = createTime.getFullYear();
//   var month = createTime.getMonth() + 1;
//   var day = '28';
//   var investDate = (year + 10) + '年' + month + '月' + day + '日';
//   var mettingDate = year + '年' + month + '月' + day + '日';  

//   var regulationFileName = '';
//   var holderFileName = '';
//   var registrationFileName = '';

//   var holderName = [];
//   var holderIDType = [];    
//   var holderID = [];
//   var investType = [];
//   var investShare = [];
//   var investMoneyAmount = [];
//   var investDateOutput = [];

//   var holderLength = 0;
//   if(order.hasOwnProperty("holders")) {
//   	holderLength = order.holders.length;
//   }

 
//   if(order.hasOwnProperty("holders")) {
//   	var holders = order.holders;

// 	  holders.forEach(function(holder) {
// 	  	if(holder.hasOwnProperty("holderName")) {
// 		    holderName.push(holder.holderName);
// 	  	} else {
// 	  		holderName.push("");
// 	  	}

// 	    holderIDType.push("身份证");

// 	  	if(holder.hasOwnProperty("holderId")) {
// 	  		holderID.push(holder.holderId);
// 	  	} else {
// 	  		holderID.push("");
// 	  	}

// 	  	if(holder.hasOwnProperty("holderType")) {
// 	  		investType.push(holder.holderType);
// 	  	} else {
// 	  		investType.push("");
// 	  	}

// 	  	if(holder.hasOwnProperty("moneyPercent")) {
// 	  		investShare.push(holder.moneyPercent + "%");
// 	  	} else {
// 	  		investShare.push("");
// 	  	}

// 	  	if(holder.hasOwnProperty("money")) {
// 	  		investMoneyAmount.push(holder.money);
// 	  	} else {
// 	  		investMoneyAmount.push("");
// 	  	}

// 	    investDateOutput.push(investDate);
// 	  })
// 	};

// 	log("holderLength: " + holderLength)
//   if(holderLength <= 1) {
//     log("单人")
//     regulationFileName = 'K0211090301';
//     holderFileName = 'K0211090201';
//     registrationFileName = 'K0211090601';

//     var regulations = {
//       fileName: regulationFileName,
//       cnLabel : '公司章程',
//       companyName: companyName,
//       companyAddress: companyAddress,
//       productionAddress: productionAddress,
//       businessScope: businessScope,
//       moneyAmount: moneyAmount,
//       holderName: holderName[0],
//       investDate: investDateOutput[0],
//       investType: investType[0],
//       investMoney: investMoneyAmount[0]
//     }

//   } else {
//     log('多人')
//     regulationFileName = 'K0211090302';
//     holderFileName = 'K0211090202';
//     registrationFileName = 'K0211090602'; 
//     var regulations = {
//       fileName: regulationFileName,
//       cnLabel : '公司章程',
//       companyName: companyName,
//       companyAddress: companyAddress,
//       productionAddress: productionAddress,
//       businessScope: businessScope,
//       moneyAmount: moneyAmount,
//       holderName: holderName,
//       investDate: investDateOutput,
//       investType: investType,
//       investMoney: investMoneyAmount
//     }
//   }  

//   var requests = [];
//   requests.push(regulations);

//   var shareholder = {
//     fileName : holderFileName,
//     cnLabel : '股东会决议',
//     mettingDate: mettingDate,
//     companyName : companyName,
//     chairmanName: chairmanName,
//     managerName: managerName,
//     supervisorName:supervisorName,
//     supervisorID: supervisorID
//   }
//   requests.push(shareholder)

//   var leasing = {
//     fileName: 'K0211090401',
//     cnLabel: '房屋租赁合同',
//     companyName: companyName,
//     companyAddress: companyAddress     
//   }
//   requests.push(leasing);

//   // 公司备案申请书  // 公司备案申请书
//   var registrationBook = {
//     fileName: registrationFileName,
//     cnLabel : '公司登记（备案）申请书',    
//     companyName: companyName,
//     companyZone: companyZone,
//     companyType: companyType,
//     companyId: companyId,
//     companyTel: companyTel,
//     companyZipcode: companyZipcode,
//     businessScope: businessScope,
//     businessPeriod: businessPeriod,

//     companyAddress: companyAddress,
//     productionAddress: productionAddress,

//     legalPersonName: legalPersonName,
//     legalPersonTel: legalPersonTel,
//     legalPersonPhone: legalPersonPhone,
//     legalPersonEmail: legalPersonEmail,
//     legalPersonIDType: legalPersonIDType,
//     legalPersonID: legalPersonID,

//     chairmanName: chairmanName,
//     chairmanType: chairmanType,
//     chairmanIDType: chairmanIDType,
//     chairmanID: chairmanID,
//     chairmanPhone: chairmanPhone,

//     supervisorName: supervisorName,
//     supervisorType: supervisorType,
//     supervisorIDType: supervisorIDType,
//     supervisorID: supervisorID,

//     managerName: managerName,
//     managerType: managerType,
//     managerIDType: managerIDType,
//     managerID: managerID,

//     holderName: holderName,
//     holderIDType: holderIDType,
//     holderID: holderID,
//     investType: investType,
//     investDate: investDateOutput,
//     money: investMoneyAmount,
//     share: investShare,
//     moneyAmount: moneyAmount,

//     contractorName: contractorName,
//     contractorTel: contractorTel,
//     contractorPhone: contractorPhone,
//     contractorEmail: contractorEmail,
//     contractorIDType: contractorIDType,
//     contractorID: contractorID,

//     financialStaffName: financialStaffName,
//     financialStallTel: financialStallTel,
//     financialStaffPhone: financialStaffPhone,
//     financialStaffEmail: financialStaffEmail,
//     financialStaffIDType: financialStaffIDType,
//     financialStaffID: financialStaffID
//   }

//   requests.push(registrationBook);

//   var commitment = {
//     fileName: 'K0211090701',
//     cnLabel : '广告企业告知承诺书'
//   };

//   requests.push(commitment);

//   var appraise = {
//     fileName: 'K0211090801',
//     cnLabel : '小型微型企业认定申请表'
//   };
//   requests.push(appraise);

//   var companyIdApplication = {
//     fileName: 'K0211090901',
//     cnLabel : '上海市组织机构代码申请表'
//   };

//   requests.push(companyIdApplication);

//   var cogeneration = {
//     fileName: 'K0211021001',
//     cnLabel : '联动登记申请单',
//     companyName: companyName,
//     companyAddress: companyAddress,
//     legalPersonName: legalPersonName,
//     legalPersonPhone: legalPersonPhone,
//     companyType: companyType,
//     zipcode: companyZipcode    
//   }
//   requests.push(cogeneration);
//   log(requests);
//   return requests;
// }

// HandleRegPDOrder(order)




























