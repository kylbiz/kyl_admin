  // JavaScript Document
    $(document).ready(function(){
        var v = 340;
        $('#allPageSize').val(v);//设置总行数
        textPageSize(1);
    });
        
    function textPageSize(num){//num是当前页码
        //页面总数
        var size = $('#allPageSize').val();
       //将当前页固话到页面隐藏域
       $('#pageNum').val(num);
       //基数,向上取整,每页显示12条记录
       var base = Math.ceil(size/12);
       var info = '';
       if(size > 12){
           var index = num;
           var i = 1;
           if(num>5){
               if(num+5>=base){//确保最后保持4页
                   index -= 9 - (base-index);
               }else{//确保当前页之前有5页
                   index -= 5;
               }
           }else{
               index = 1;
           }
           //当前页不为第一页时显示上一页
           if(num!=1){
               info += '<a href="javascript:pageDown(-1);" class="button" value="pageUp" id="pageSizeNumberUp">< 上一页</a>&nbsp;&nbsp;';
           }
           while(index<=base&&i<11){
               if(index==num){
                   info += '<span><a href="javascript:pageDown('+index+');" style="color:#999;font-size:32px;" class="button" id="pageSizeNumber'+index+'">'+index+'</a></span>&nbsp;&nbsp;';
               }else{
                   info += '<span><a href="javascript:pageDown('+index+');" class="button" id="pageSizeNumber'+index+'">'+index+'</a></span>&nbsp;&nbsp;';
               }
               i++;
               index++;
           }
           //当前页不为最后一页时显示下一页
           if(num!=base){
               info += '<a href="javascript:pageDown(0);" class="button" value="pageDown" id="pageSizeNumberDown">下一页 ></a>';
           }
           //向html里添加页面元素
           $('#pageNumberUpAndDown').append(info);
       }
    }

    function pageDown(num){
       var i = num;
       var pageSize = $('#pageNum').val();//当前页数
       var size = $('#allPageSize').val();//页面总数
        //每次单击之前，将分页内容清空
       $('#pageNumberUpAndDown').html('');
       if(i>0){//i>0表示当前是通过页码触发
           $('#pageNum').val(num);
           textPageSize(i);
       }else{
           if(i==-1){//上一页
               if(pageSize>1){
                   pageSize--;
                   textPageSize(pageSize);
                   $('#pageNum').val(pageSize);
               }
           }else{//下一页
               //基数
               var base = Math.ceil(size/12);
               if(base>pageSize){
                   pageSize++;
                   textPageSize(pageSize);
                   $('#pageNum').val(pageSize);
               }
           }
       }
    }