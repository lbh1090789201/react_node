let Promise = require("bluebird");
let commonMethod = require("../config/commonMethod");
let request = require("request");
const options={
    host: 'https://kyfw.12306.cn',
    pathname: "/otn/leftTicket/queryT"
};

/**
* 获取车票列表
*/
function getTicketList(params, callBack) {
  // 'leftTicketDTO.train_date='+params.date+'&leftTicketDTO.from_station='+params.from_station+'&leftTicketDTO.to_station='+params.to_station+'&purpose_codes='+params.purpose_codes
  console.log(params, `${options.host}${options.pathname}?leftTicketDTO.train_date=${params.date}&leftTicketDTO.from_station=${params.from_station}&leftTicketDTO.to_station=${params.to_station}&purpose_codes=${params.purpose_codes}`, 44444)
  new Promise(function(resolve, reject) {
    getFrom12306(resolve, reject, params);
  })
  .then((json) => {
    commonMethod.success(callBack, json, "获取火车票信息成功！");
  })
  .catch((err) => {
    commonMethod.fail(callBack, err, "获取火车票信息失败！");
  })
}

function getFrom12306(resolve, reject, params) {
  request.get(`${options.host}${options.pathname}?leftTicketDTO.train_date=${params.date}&leftTicketDTO.from_station=${params.from_station}&leftTicketDTO.to_station=${params.to_station}&purpose_codes=${params.purpose_codes}`, (err, res, body) => {
    if(err) {
      // console.log(err.Error, 33333)
      return reject({errno : "403", errinfo : "访问12306铁路失败！"});
    } else {
      if(body.indexOf('!DOCTYPE html') === -1) {
        let data = JSON.parse(body);
        if(data.c_url) {
          options.pathname = `/otn/${data.c_url}`;
          console.log(data, 1111111)
          getFrom12306(resolve, reject, params);
        } else {
          console.log(data, 222222)
          return resolve(data);
        }
      } else {
        return reject({errno : "403", errinfo : "访问12306铁路失败！"});
      }
    }
  })
}

module.exports = {
  getTicketList: getTicketList
}
