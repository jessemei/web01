$(document).ready(function () {  
  
    // 初始化时间控件  
    initDateTimePicker();  
    // 第一次查询数据  
    btnQuery();  
    // 查询按钮点击事件  
    $('#retrieveBtn').on('click', function () {  
        btnQuery();  
    });  
  
    // start  详情操作相关  
    // 详情按钮点击事件  
    $('#detailBtn').on('click', function () {  
        var selectedCheckBoxArray = $('.dataId:checked');// 选择所有勾选  
        if (0 == selectedCheckBoxArray.length) {  
            $('#infoModalMsg').text('请选择一条数据进行操作');  
            $('#infoModal').modal('show');  
        } else if (1 < selectedCheckBoxArray.length) {  
            $('#infoModalMsg').text('请勿选择多条数据进行操作');  
            $('#infoModal').modal('show');  
        } else {  
            var dataId = $(selectedCheckBoxArray[0]).attr("data-id");  
            console.log('选择的dataId = ' + dataId);  
            $.ajax({  
                url: '/CRUD/RetrieveById',  
                data: { id: dataId },  
                type: 'get',  
                dataType: 'json',  
                success: function (data) {  
                    if (1 == data.result) {  
                        $('#detailMoneyType').text(data.data.MoneyType);  
                        $('#detailAccountType').text(data.data.AccountType);  
                        $('#detailUrlType').text(data.data.UrlType);  
                        $('#detailEmailType').text(data.data.EmailType);  
                        $('#detailModal').modal('show');  
                    } else {  
                        $('#infoModalMsg').text(data.msg);  
                        $('#infoModal').modal('show');  
                    }  
                },  
                error: function (err) {  
                    $('#infoModalMsg').text('网络错误，请稍后重试');  
                    $('#infoModal').modal('show');  
                }  
            });  
  
        }  
    });  
    // end  详情操作相关  
    // start  新增操作相关  
    // 弹出新增窗口  
    $('#createBtn').on('click', function () {  
        initCreateInputs();  
        initCreateStyle();  
        $('#createModal').modal('show');  
    });  
    // 重置  
    $('#resetCreateBtn').on('click', function () {  
        initCreateInputs();  
        initCreateStyle();  
    });  
    // 提交新增数据  
    $('#doCreateBtn').on('click', function () {  
        var createModel = new Object();  
        createModel.MoneyType = parseFloat($('#createMoneyType').val().trim());  
        createModel.AccountType = $('#createAccountType').val().trim();  
        createModel.UrlType = $('#createUrlType').val().trim();  
        createModel.EmailType = $('#createEmailType').val().trim();  
        if (validateCreateData(createModel)) {// 通过了前台的数据验证，ajax提交数据  
            $('#createModal').modal('hide');// 为了避免重复提交，modal隐藏掉  
            commitCreateData(createModel);  
        } else {// 没有通过验证,do nothing...just show those err msgs  
  
        }  
    });  
    // end  新增操作相关  
  
    // start  修改操作相关  
    // 修改按钮点击事件  
    $('#updateBtn').on('click', function () {  
        var selectedCheckBoxArray = $('.dataId:checked');// 选择所有勾选  
        if (0 == selectedCheckBoxArray.length) {  
            $('#infoModalMsg').text('请选择一条数据进行操作');  
            $('#infoModal').modal('show');  
        } else if (1 < selectedCheckBoxArray.length) {  
            $('#infoModalMsg').text('请勿选择多条数据进行操作');  
            $('#infoModal').modal('show');  
        } else {  
            var dataId = $(selectedCheckBoxArray[0]).attr("data-id");  
            $.ajax({  
                url: '/CRUD/RetrieveById',  
                data: { id: dataId },  
                type: 'get',  
                dataType: 'json',  
                //async: false,// 设置为同步模式  
                success: function (data) {  
                    if (1 == data.result) {  
                        initUpdateStyle();  
                        $('#updateId').val(data.data.Id);  
                        $('#updateMoneyType').val(data.data.MoneyType);  
                        $('#updateAccountType').val(data.data.AccountType);  
                        $('#updateUrlType').val(data.data.UrlType);  
                        $('#updateEmailType').val(data.data.EmailType);  
                        $('#updateModal').modal('show');  
                    } else {  
                        $('#infoModalMsg').text(data.msg);  
                        $('#infoModal').modal('show');  
                    }  
                },  
                error: function (err) {  
                    $('#infoModalMsg').text('网络错误，请稍后重试');  
                    $('#infoModal').modal('show');  
                }  
            });  
        }  
    });  
  
    // 修改重置  
    $('#resetUpdateBtn').on('click', function () {  
        var selectedCheckBoxArray = $('.dataId:checked');// 选择所有勾选  
        var dataId = $(selectedCheckBoxArray[0]).attr("data-id");  
        $.ajax({  
            url: '/CRUD/RetrieveById',  
            data: { id: dataId },  
            type: 'get',  
            dataType: 'json',  
            success: function (data) {  
                if (1 == data.result) {  
                    initUpdateStyle();  
                    $('#updateId').val(data.data.Id);  
                    $('#updateMoneyType').val(data.data.MoneyType);  
                    $('#updateAccountType').val(data.data.AccountType);  
                    $('#updateUrlType').val(data.data.UrlType);  
                    $('#updateEmailType').val(data.data.EmailType);  
                } else {  
                    $('#updateModal').modal('hide');  
                    $('#infoModalMsg').text(data.msg);  
                    $('#infoModal').modal('show');  
                }  
            },  
            error: function (err) {  
                $('#updateModal').modal('hide');  
                $('#infoModalMsg').text('网络错误，请稍后重试');  
                $('#infoModal').modal('show');  
            }  
        });  
    });  
  
    // 确认修改  
    $('#doUpdateBtn').on('click', function () {  
        var updateModel = new Object();  
        updateModel.Id = parseInt($('#updateId').val().trim());  
        updateModel.MoneyType = parseFloat($('#updateMoneyType').val().trim());  
        updateModel.AccountType = $('#updateAccountType').val().trim();  
        updateModel.UrlType = $('#updateUrlType').val().trim();  
        updateModel.EmailType = $('#updateEmailType').val().trim();  
        if (validateUpdateData(updateModel)) {  
            $('#updateModal').modal('hide');  
            commitUpdateData(updateModel);  
        } else {  
        }  
    });  
    // end  修改操作相关  
  
    // start  删除操作相关  
    //删除按钮点击事件  
    $('#deleteBtn').on('click', function () {  
        var selectedCheckBoxArray = $('.dataId:checked');// 选择所有勾选  
        if (0 == selectedCheckBoxArray.length) {  
            $('#infoModalMsg').text('请选择数据进行操作');  
            $('#infoModal').modal('show');  
        } else {  
            var count = selectedCheckBoxArray.length;  
            $('#deleteConfirmMsg').text('确定要删除这' + count + '条数据吗？');  
            $('#deleteConfirmModal').modal('show');  
        }  
    });  
  
    // 确认删除  
    $('#doDeleteBtn').on('click', function () {  
        $('#deleteConfirmModal').modal('hide');//   
        var selectedCheckBoxArray = $('.dataId:checked');// 选择所有勾选  
        var dataIds = '';  
        for (var i = 0; i < selectedCheckBoxArray.length; i++) {  
            dataIds += $(selectedCheckBoxArray[i]).attr("data-id");  
            dataIds += ',';  
        }  
        dataIds = dataIds.substring(0, dataIds.length - 1);// 去除后面的逗号  
        $.ajax({  
            url: '/CRUD/DoDelete',  
            data: { ids: dataIds },//   
            type: 'POST',  
            dataType: 'json',  
            success: function (data) {  
                $('#infoModalMsg').text(data.msg);  
                $('#infoModal').modal('show');  
                setTimeout("clearMsgAndRefreshData();", 2000);  
            },  
            error: function (err) {  
                $('#infoModalMsg').text('网络错误，请稍后重试');  
                $('#infoModal').modal('show');  
                setTimeout("clearMsgAndRefreshData();", 2000);  
            }  
        });  
    });  
    // end  删除操作相关  
});  
  
// 验证修改数据   
function validateUpdateData(updateModel) {  
    var validFlag = true;  
    var updateMoneyType = updateModel.MoneyType;  
    var updateMoneyTypeExp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;// 0-99999999.99  
    if ('' == updateMoneyType) {  
        validFlag = false;  
        $('#updateMoneyTypeErrorMsg').text('此项必填');  
    } else if (!updateMoneyTypeExp.test(updateMoneyType)) {  
        validFlag = false;  
        $('#updateMoneyTypeErrorMsg').text('格式不符合要求');  
    } else {  
        $('#updateMoneyTypeErrorMsg').text('');  
    }  
  
    var updateAccountType = updateModel.AccountType;  
    console.log('updateAccountType = ' + updateAccountType);  
    var updateAccountTypeExp = /^[A-Za-z]{6,20}$/;  
    if ('' == updateAccountType) {  
        validFlag = false;  
        $('#updateAccountTypeErrorMsg').text('此项必填');  
    } else if (!updateAccountTypeExp.test(updateAccountType)) {  
        validFlag = false;  
        $('#updateAccountTypeErrorMsg').text('格式不符合要求');  
    }  
    else {  
        $('#updateAccountTypeErrorMsg').text('');  
    }  
  
    var updateUrlType = updateModel.UrlType;  
    var updateUrlTypeExp = /^[A-Za-z]+$/;  
    if ('' == updateUrlType) {  
        validFlag = false;  
        $('#updateUrlTypeErrorMsg').text('此项必填');  
    } else if (!updateUrlTypeExp.test(updateUrlType)) {  
        validFlag = false;  
        $('#updateUrlTypeErrorMsg').text('格式不符合要求');  
    } else {  
        $('#updateUrlTypeErrorMsg').text('');  
    }  
  
    var updateEmailType = updateModel.EmailType;  
    var updateEmailTypeExp = /^.+@.+\..+$/;  
    if ('' == updateEmailType) {  
        validFlag = false;  
        $('#updateEmailTypeErrorMsg').text('此项必填');  
    } else if (!updateEmailTypeExp.test(updateEmailType)) {  
        validFlag = false;  
        $('#updateEmailTypeErrorMsg').text('格式不符合要求');  
    } else {  
        $('#updateEmailTypeErrorMsg').text('');  
    }  
    return validFlag;  
}  
// 提交修改数据  
function commitUpdateData(updateModel) {  
    $.ajax({  
        url: '/CRUD/DoUpdate',  
        data: updateModel,// 直接将js object类作为参数，可行！  
        type: 'POST',  
        dataType: 'json',  
        success: function (data) {  
            $('#infoModalMsg').text(data.msg);  
            $('#infoModal').modal('show');  
            setTimeout("clearMsgAndRefreshData();", 2000);  
        },  
        error: function (err) {  
            $('#infoModalMsg').text('网络错误，请稍后重试');  
            $('#infoModal').modal('show');  
            setTimeout("clearMsgAndRefreshData();", 2000);  
        }  
    });  
}  
// 提交新增数据  
function commitCreateData(createModel) {  
    $.ajax({  
        url: '/CRUD/DoCreate',  
        data: createModel,// 直接将js object类作为参数，可行！  
        type: 'POST',  
        dataType: 'json',  
        success: function (data) {  
            $('#infoModalMsg').text(data.msg);  
            $('#infoModal').modal('show');  
            setTimeout("clearMsgAndRefreshData();", 2000);  
        },  
        error: function (err) {  
            $('#infoModalMsg').text('网络错误，请稍后重试');  
            $('#infoModal').modal('show');  
            setTimeout("clearMsgAndRefreshData();", 2000);  
        }  
    });  
}  
  
// 清除提示信息并重新加载数据  
function clearMsgAndRefreshData() {  
    $('#infoModal').modal('hide');  
    btnQuery();  
}  
// 验证新增数据  
function validateCreateData(createModel) {  
    var validFlag = true;  
    var createMoneyType = createModel.MoneyType;  
    var createMoneyTypeExp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;// 0-99999999.99  
    if ('' == createMoneyType) {  
        validFlag = false;  
        $('#createMoneyTypeErrorMsg').text('此项必填');  
    } else if (!createMoneyTypeExp.test(createMoneyType)) {  
        validFlag = false;  
        $('#createMoneyTypeErrorMsg').text('格式不符合要求');  
    } else {  
        $('#createMoneyTypeErrorMsg').text('');  
    }  
  
    var createAccountType = createModel.AccountType;  
    console.log('createAccountType = ' + createAccountType);  
    var createAccountTypeExp = /^[A-Za-z]{6,20}$/;  
    if ('' == createAccountType) {  
        validFlag = false;  
        $('#createAccountTypeErrorMsg').text('此项必填');  
    } else if (!createAccountTypeExp.test(createAccountType)) {  
        validFlag = false;  
        $('#createAccountTypeErrorMsg').text('格式不符合要求');  
    }  
    else {// 远程验证  
        $.ajax({  
            url: '/CRUD/ValidCreateAccountType',  
            data: { 'createAccountType': createAccountType },  
            type: 'get',  
            dataType: 'json',  
            async: false,// 设置为同步模式  
            success: function (data) {  
                if (1 == data.result) {  
                    validFlag = false;  
                    $('#createAccountTypeErrorMsg').text('此账号已经被使用');  
                } else {  
                    $('#createAccountTypeErrorMsg').text('');  
                }  
            },  
            error: function (err) {  
                validFlag = false;  
                $('#createAccountTypeErrorMsg').text('此账号已经被使用');  
            }  
        });  
    }  
  
    var createUrlType = createModel.UrlType;  
    var createUrlTypeExp = /http:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;  
    if ('' == createUrlType) {  
        validFlag = false;  
        $('#createUrlTypeErrorMsg').text('此项必填');  
    } else if (!createUrlTypeExp.test(createUrlType)) {  
        validFlag = false;  
        $('#createUrlTypeErrorMsg').text('格式不符合要求');  
    } else {  
        $('#createUrlTypeErrorMsg').text('');  
    }  
  
    var createEmailType = createModel.EmailType;  
    var createEmailTypeExp = /^.+@.+\..+$/;  
    if ('' == createEmailType) {  
        validFlag = false;  
        $('#createEmailTypeErrorMsg').text('此项必填');  
    } else if (!createEmailTypeExp.test(createEmailType)) {  
        validFlag = false;  
        $('#createEmailTypeErrorMsg').text('格式不符合要求');  
    } else {  
        $('#createEmailTypeErrorMsg').text('');  
    }  
    return validFlag;  
}  
// 初始化新增输入内容  
function initCreateInputs() {  
    $('#createMoneyType').val('');  
    $('#createAccountType').val('');  
    $('#createUrlType').val('');  
    $('#createEmailType').val('');  
}  
// 初始化新增提示信息  
function initCreateStyle() {  
    $('#createMoneyTypeErrorMsg').text('');  
    $('#createAccountTypeErrorMsg').text('');  
    $('#createUrlTypeErrorMsg').text('');  
    $('#createEmailTypeErrorMsg').text('');  
}  
// 初始化修改提示信息  
function initUpdateStyle() {  
    $('#updateMoneyTypeErrorMsg').text('');  
    $('#updateAccountTypeErrorMsg').text('');  
    $('#updateUrlTypeErrorMsg').text('');  
    $('#updateEmailTypeErrorMsg').text('');  
}  
// 分页链接点击查询  
function pageQuery(target) {  
    var queryKey = '';  
    var sortName = 'id';  
    var sortOrder = 'asc';  
    var pageText = target.text;  
    var currentPage = '1';  
    if ('首页' == pageText) {  
        currentPage = '1';  
    } else if ('末页' == pageText) {  
        currentPage = $('#totalPage').val();  
    } else {  
        currentPage = pageText;  
    }  
    var pageSize = $('#pageSize').val();  
    getAndShowData(queryKey, sortName, sortOrder, currentPage, pageSize);  
}  
// 按钮点击查询  
function btnQuery() {  
    var queryKey = '';  
    var sortName = 'id';  
    var sortOrder = 'asc';  
    var currentPage = $('#currentPage').val();  
    var pageSize = $('#pageSize').val();  
    getAndShowData(queryKey, sortName, sortOrder, currentPage, pageSize);  
}  
// 获取并显示数据  
function getAndShowData(queryKey, sortName, sortOrder, currentPage, pageSize) {  
    $.ajax({  
        url: '/CRUD/RetrievePageData',  
        data: { 'queryKey': queryKey, 'sortName': sortName, 'sortOrder': sortOrder, 'currentPage': currentPage, 'pageSize': pageSize },  
        type: 'GET',  
        dataType: 'json',  
        success: function (data) {  
            var trs = '';  
            if (1 == data.result) {  
                for (var i = 0; i < data.data.length; i++) {  
                    var dataId = data.data[i].Id;  
                    trs += '<tr>';  
                    trs += '<td><input type="checkbox" class="dataId" data-id="' + dataId + '"/></td>';  
                    trs += '<td>' + parseInt(i + 1) + '</td>';  
                    trs += '<td>' + dataId + '</td>';  
                    trs += '<td>' + data.data[i].MoneyType + '</td>';  
                    trs += '<td>' + data.data[i].AccountType + '</td>';  
                    trs += '<td>' + data.data[i].UrlType + '</td>';  
                    trs += '<td>' + data.data[i].EmailType + '</td>';  
                    trs += '<td>' + data.data[i].TelTyple + '</td>';  
                    trs += '<td>' + data.data[i].MobilePhoneType + '</td>';  
                    trs += '<td>' + data.data[i].IpType + '</td>';  
                    trs += '<td>' + data.data[i].QqType + '</td>';  
                    trs += '<td>' + data.data[i].IdType + '</td>';  
                    trs += '<td>' + data.data[i].PostCodeType + '</td>';  
                    trs += '</tr>';  
                }  
  
                var totalCount = data.totalCount;  
                var currentPage = data.currentPage;  
                var totalPage = data.totalPage;  
                // 隐藏区域赋值  
                $('#totalCount').val(totalCount);  
                $('#currentPage').val(currentPage);  
                $('#totalPage').val(totalPage);  
                // 分页信息提示显示  
                var pageInfo = '总共' + totalCount + '条记录，总共' + totalPage + '页，当前第' + currentPage + '页';  
                $('#pageInfo').html(pageInfo);  
                // 分页链接信息  
                var pageLinks = '';  
                pageLinks += '<li><a href="javascript:void(0);" class="pageQuery">首页</a></li>';  
                for (var j = 1; j <= parseInt(totalPage) ; j++) {  
                    if (j == parseInt(currentPage)) {  
                        pageLinks += '<li class="active"><a href="javascript:void(0);" class="pageQuery">' + j + '</a></li>';  
                    } else {  
                        pageLinks += '<li><a href="javascript:void(0);" class="pageQuery">' + j + '</a></li>';  
                    }  
                }  
                pageLinks += '<li><a href="javascript:void(0);" class="pageQuery">末页</a></li>';  
                $('#pageLinks').html(pageLinks);  
                // 绑定点击事件  
                $('.pageQuery').on('click', function () {  
                    pageQuery(this);  
                });  
            } else {  
                trs += '<tr><td colspan="13">';  
                trs += '<div class="alert alert-warning">';  
                trs += '<a href="#" class="close" data-dismiss="alert">';  
                trs += '×';  
                trs += '</a>';  
                trs += '<strong>警告！</strong>' + data.msg;  
                trs += '</div>';  
                trs += '</td></tr>';  
            }  
            $('#dataTable tbody').html(trs);  
        },  
        error: function (ex) {  
            var exTrs = '';  
            exTrs += '<tr><td colspan="13">';  
            exTrs += '<div class="alert alert-warning">';  
            exTrs += '<a href="#" class="close" data-dismiss="alert">';  
            exTrs += '×';  
            exTrs += '</a>';  
            exTrs += '<strong>警告！</strong>网络错误，请稍后重试';  
            exTrs += '</div>';  
            exTrs += '</td></tr>';  
            $('#dataTable tbody').html(exTrs);  
        }  
    });  
}  
// 初始化日期时间选择控件  
function initDateTimePicker() {  
    $('#datetimepicker').datetimepicker({  
        format: 'yyyy-MM-dd hh:mm:ss',  
        language: 'zh-CN',// 默认的“en”。引入了扩展了的汉化js  
        pickDate: true,  
        pickTime: true,  
        hourStep: 1,  
        minuteStep: 15,  
        secondStep: 30,  
        inputMask: true  
    });  
}  