/**
 * mock 模拟商品列表查询返回数据
 */
const getGmflist = {
		"count": 20,
		"currentPage": 1,
		"list": [{
			"bfxx": "",
			"bz": "",
			"createId": 1,
			"createTime": 1550136984000,
			"deleteFlag": "N",
			"dzdh": "",
			"id": 353,
			"jgId": 1,
			"khbh": "5666",
			"khmc": "ted",
			"khsh": "",
			"updateId": null,
			"updateTime": 1550136984000,
			"yhzh": ""
		}, {
			"bfxx": "",
			"bz": "33",
			"createId": 1,
			"createTime": 1547533154000,
			"deleteFlag": "N",
			"dzdh": "",
			"id": 351,
			"jgId": 1,
			"khbh": "1222",
			"khmc": "ghgj",
			"khsh": "",
			"updateId": null,
			"updateTime": 1547533154000,
			"yhzh": "3"
		}, {
			"bfxx": "",
			"bz": "%；‘",
			"createId": 1,
			"createTime": 1547433625000,
			"deleteFlag": "N",
			"dzdh": "",
			"id": 347,
			"jgId": 1,
			"khbh": "6677894",
			"khmc": "apple",
			"khsh": "",
			"updateId": null,
			"updateTime": 1547433625000,
			"yhzh": ""
		}, {
			"bfxx": "",
			"bz": "&%@#$%^^&**()",
			"createId": 1,
			"createTime": 1547433050000,
			"deleteFlag": "N",
			"dzdh": "",
			"id": 345,
			"jgId": 1,
			"khbh": "5678432",
			"khmc": "解放军",
			"khsh": "",
			"updateId": 1,
			"updateTime": 1548665114000,
			"yhzh": ""
		}, {
			"bfxx": "",
			"bz": "+",
			"createId": 1,
			"createTime": 1547175797000,
			"deleteFlag": "N",
			"dzdh": "",
			"id": 343,
			"jgId": 1,
			"khbh": "6666666",
			"khmc": "房贷首付",
			"khsh": "",
			"updateId": null,
			"updateTime": 1547175797000,
			"yhzh": ""
		}],
		"pageSize": 5
	
	}
export default {
  getGmflist: res => {
    const info = getGmflist
    if (info) {
      return {
        code: 20000,
        data: info,
        message: "返回数据成功"
      }
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  }
}
