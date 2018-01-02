export default function filterZero(metric, obj) {
    var keys = Object.keys(obj)
    var returnObj = {}
    var filtered = keys.map(function (key) {
        var tempObj = {}
        tempObj[key] = {}
        var innerObj = obj[key]
        var innerKeys = Object.keys(innerObj)
        var elemObj = innerKeys.map(function (innerkey) {
            var row = innerObj[innerkey]
            if (row[metric] > 0) {
                tempObj[key][innerkey] = row
            }
        })
        var keySize = Object.keys(tempObj[key]).length
        if (keySize > 0) {
            returnObj[key] = tempObj[key]
        }
    })
    return returnObj
}