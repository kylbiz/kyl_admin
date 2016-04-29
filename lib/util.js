Util = {};

Util.area_shanghai = [
  {label: '全区', value: '全区'},
  {label: '黄浦', value: '黄浦'},
  {label: '徐汇', value: '徐汇'},
  {label: '长宁', value: '长宁'},
  {label: '静安', value: '静安'},
  {label: '普陀', value: '普陀'},
  {label: '虹口', value: '虹口'},
  {label: '杨浦', value: '杨浦'},
  {label: '闵行', value: '闵行'},
  {label: '宝山', value: '宝山'},
  {label: '嘉定', value: '嘉定'},
  {label: '宝山', value: '宝山'},
  {label: '宝山', value: '宝山'},
  {label: '浦东', value: '浦东'},
  {label: '金山', value: '金山'}
]

Util.merge_options = function(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
