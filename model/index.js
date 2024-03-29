var express = require('express');
var app = express();
var mysql = require('mysql');
var db = require('../config/db');

/* GET getAdmin. */
app.getAdmin = function(username, password, callback) {
	var c = mysql.createConnection(db);
	var sql = "select * from admin where username = '"+username+"';";
	c.connect();
	c.query(sql, function(error, result) {
		if (error) {console.log(error)};
		if (result != "") {
			if (result[0].password == password) {
				var code = 0;
				var message = "success";
				callback(code, message, result);
			} else {
				var code = -1;
				var message = "fail";
				result = [];
				callback(code, message, result);
			}
		}else {
			var code = -1;
			var message = "fail"
			callback(code, message, result);
		}
	});
	c.end();
}
/* GET getAdmins. */
app.getAdmins = function(callback) {
	var c = mysql.createConnection(db);
	var sql = "select * from admin";
	c.connect();
	c.query(sql, function(error, result) {
		if (error) {console.log(error)};
		if (result != "") {
			for (var i = 0; i < result.length; i++) {
				result[i].tags = result[i].tags.split(',');
			}
			var code = 0;
			var message = "success";
			callback(code, message, result);
		}else {
			var code = -1;
			var message = "fail"
			callback(code, message, result);
		}
	});
	c.end();
}

// /* GET VoyageInfo. */
// var getVoyageINFO = function(VoyageName) {
// 	return new Promise(function (resolve, reject) {
// 		var c = mysql.createConnection(db);
// 		var sql = "select * from XM_VoyageNumber_INFO where VoyageName = '"+VoyageName+"';";
// 		c.connect();
// 		c.query(sql, function(error, result) {
// 			if (error) {
// 				reject(error);
// 			}else {
// 				resolve(result);
// 			}
// 		});
// 		c.end();
// 	})
// }
// var getSiteINFO = function(results) {
// 	return new Promise(function (resolve, reject) {
// 		var c = mysql.createConnection(db);
// 		var sql = "select id, SiteName, Longitude, Latitude from XM_Site_INFO where VoyageNumberID = '"+results[0].id+"';";
// 		c.connect();
// 		c.query(sql, function(error, result) {
// 			if (error) {
// 				reject(error);
// 			}else {
// 				var SiteINFO = result;
// 				resolve(SiteINFO);
// 			}
// 		});
// 		c.end();
// 	})
// }
// var getTaskINFO = function(results) {
// 	return new Promise(function (resolve, reject) {
// 		var c = mysql.createConnection(db);
// 		// var sql = "select SUM(Data) as Series, Type as Legend, (select SUM(Data) from XM_Task_INFO where VoyageNumberID = '"+results[0].id+"') as totalSeries from XM_Task_INFO where VoyageNumberID = '"+results[0].id+"' GROUP BY Type";
// 		var sql = "select SUM(Data) as Series, Type as Legend from XM_Task_INFO where VoyageNumberID = '"+results[0].id+"' GROUP BY Type";
// 		c.connect();
// 		c.query(sql, function(error, result) {
// 			if (error) {
// 				reject(error);
// 			}else {
// 				var TaskINFO = result;
// 				resolve(TaskINFO);
// 			}
// 		});
// 		c.end();
// 	})
// }
// var getSampleINFO = function(results) {
// 	return new Promise(function (resolve, reject) {
// 		var c = mysql.createConnection(db);
// 		// var sql = "select SUM(Data) as Series,Type as Legend,(select SUM(Data) from XM_Sample_INFO where VoyageNumberID = '"+results[0].id+"') as totalSeries from XM_Sample_INFO where VoyageNumberID = '"+results[0].id+"' GROUP BY Type";
// 		var sql = "select SUM(Data) as Series,Type as Legend from XM_Sample_INFO where VoyageNumberID = '"+results[0].id+"' GROUP BY Type";
// 		c.connect();
// 		c.query(sql, function(error, result) {
// 			if (error) {
// 				reject(error);
// 			}else {
// 				var SampleINFO = result;
// 				resolve(SampleINFO);
// 			}
// 		});
// 		c.end();
// 	})
// }
// app.getVoyageInfo = function(VoyageName, callback) {
// 	getVoyageINFO(VoyageName).then(function(result) {
// 		getSiteINFO(result).then(function(SiteINFO) {
// 			result[0].totalSite = SiteINFO.length;
// 			result[0].SiteInfo = SiteINFO;
// 			getTaskINFO(result).then(function(TaskINFO) {
// 				result[0].Task = TaskINFO;
// 				getSampleINFO(result).then(function(SampleINFO) {
// 					result[0].Sample = SampleINFO;
// 					var code = 0;
// 					var message = "success";
// 					callback(code, message, result);
// 				})
// 			})
			
// 		})
// 	})
// }

// /* GET SiteInfo. */
// var SiteINFOforID =  function(id) {
// 	return new Promise(function (resolve, reject) {
// 		var c = mysql.createConnection(db);
// 		var sql = "select * from XM_Site_INFO where id = '"+id+"';";
// 		c.connect();
// 		c.query(sql, function(error, result) {
// 			if (error) {
// 				reject(error);
// 			}else {
// 				resolve(result);
// 			}
// 		});
// 		c.end();
// 	})
// }
// var DataTaskINFO = function(results) {
// 	return new Promise(function (resolve, reject) {
// 		var c = mysql.createConnection(db);
// 		// var sql = "select XM_Task_INFO.Type,XM_Task_INFO.Data as Task,XM_Sample_INFO.Data as Sample,XM_Task_INFO.OperationTime from XM_Task_INFO inner join XM_Sample_INFO on XM_Task_INFO.SiteID = XM_Sample_INFO.SiteID and XM_Task_INFO.Type = XM_Sample_INFO.Type where XM_Task_INFO.SiteID = '"+results[0].id+"';"
// 		var sql = "select Type as TaskType, Data as TaskData from XM_Task_INFO where SiteID = '"+results[0].id+"';";
// 		c.connect();
// 		c.query(sql, function(error, result) {
// 			if (error) {
// 				reject(error);
// 			}else {
// 				var Data = result;
// 				resolve(Data);
// 			}
// 		});
// 		c.end();
// 	})
// }
// var DataSampleINFO = function(results) {
// 	return new Promise(function (resolve, reject) {
// 		var c = mysql.createConnection(db);
// 		var sql = "select Type as SampleType, Data as SampleData from XM_Sample_INFO where SiteID = '"+results[0].id+"';";
// 		c.connect();
// 		c.query(sql, function(error, result) {
// 			if (error) {
// 				reject(error);
// 			}else {
// 				var Data = result;
// 				resolve(Data);
// 			}
// 		});
// 		c.end();
// 	})
// }
// var DataOperationTimeINFO = function(results) {
// 	return new Promise(function (resolve, reject) {
// 		var c = mysql.createConnection(db);
// 		var sql = "select Type as OperationTimeType, OperationTime as OperationTimeData from XM_Task_INFO where SiteID = '"+results[0].id+"';";
// 		c.connect();
// 		c.query(sql, function(error, result) {
// 			if (error) {
// 				reject(error);
// 			}else {
// 				var Data = result;
// 				resolve(Data);
// 			}
// 		});
// 		c.end();
// 	})
// }
// app.getSiteInfo = function(id, callback) {
// 	SiteINFOforID(id).then(function(result) {
// 		DataTaskINFO(result).then(function(Data) {
// 			result[0].TaskInfo = Data;
// 			DataSampleINFO(result).then(function(Data) {
//    				result[0].SampleInfo = Data;
// 				DataOperationTimeINFO(result).then(function(Data) {
// 					result[0].OperationTimeInfo = Data;
// 					var code = 0;
// 					var message = "success";
// 					callback(code, message, result);
// 				})
// 			})
// 		})
// 	})
// }

// /* GET TaskInfo. */
// var TaskINFO = function(VoyageName, SiteID) {
// 	return new Promise(function (resolve, reject) {
// 		var c = mysql.createConnection(db);
// 		var sql = "select XM_Task_INFO.*,XM_Site_INFO.SiteName from XM_Task_INFO inner join XM_Site_INFO on XM_Task_INFO.SiteID = XM_Site_INFO.id where XM_Task_INFO.VoyageName = '"+VoyageName+"' and XM_Task_INFO.SiteID = '"+SiteID+"' and XM_Task_INFO.Type = 'CTD作业';";
// 		c.connect();
// 		c.query(sql, function(error, result) {
// 			if (error) {
// 				reject(error);
// 			}else {
// 				var Data = result;
// 				resolve(Data);
// 			}
// 		});
// 		c.end();
// 	})
// }
// app.getTaskInfo = function(VoyageName, SiteID, callback) {
// 	TaskINFO(VoyageName, SiteID).then(function(result) {
// 		result[0].cast = result[0].SiteID;
// 		var code = 0;
// 		var message = "success";
// 		callback(code, message, result);
// 	})
// }

// /* GET Voyages. */
// app.getVoyages = function(VoyageName, callback) {
// 	var c = mysql.createConnection(db);
// 	var sql = "select id,VoyageName, SiteName, Longitude, Latitude from XM_Site_INFO where VoyageName = '"+VoyageName+"';";
// 	c.connect();
// 	c.query(sql, function(error, result) {
// 		if (error) {console.log(error)}
// 		if (result != '') {
// 			var code = 0;
// 			var message = "success";
// 			callback(code, message, result);
// 		}else {
// 			var code = -1;
// 			var message = "fail";
// 			callback(code, message, result);
// 		}
// 	});
// 	c.end();
// }

// /* GET Flight. */
// app.getFlights = function(callback) {
// 	var c = mysql.createConnection(db);
// 	var sql = "select * from XM_Flight_INFO;";
// 	c.connect();
// 	c.query(sql, function(error, result) {
// 		if (error) {console.log(error)}
// 		if (result != '') {
// 			var code = 0;
// 			var message = "success";
// 			callback(code, message, result);
// 		}else {
// 			var code = -1;
// 			var message = "fail";
// 			callback(code, message, result);
// 		}
// 	});
// 	c.end();
// }
module.exports = app;